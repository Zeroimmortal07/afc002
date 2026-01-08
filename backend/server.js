const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../'))); // Serve frontend files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Data File Paths
const ORDERS_FILE = path.join(__dirname, 'orders.json');
const MENU_FILE = path.join(__dirname, 'menu.json');

// --- HELPER FUNCTIONS ---
function readJsonFile(filePath, defaultValue = []) {
    if (fs.existsSync(filePath)) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error(`Error reading ${filePath}:`, err);
            return defaultValue;
        }
    }
    return defaultValue;
}

function writeJsonFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.error(`Error writing ${filePath}:`, err);
        return false;
    }
}

// --- ROUTES ---

// 1. Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// 2. Upload Image
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ success: true, imageUrl: imageUrl });
});

// 3. Get Menu
app.get('/api/menu', (req, res) => {
    const menu = readJsonFile(MENU_FILE);
    res.json(menu);
});

// 3. Add Menu Item
app.post('/api/menu', (req, res) => {
    const newItem = req.body;

    // Validation
    if (!newItem.name || !newItem.price || !newItem.category || !newItem.image) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Set defaults if missing
    if (newItem.availability === undefined) newItem.availability = true;
    if (!newItem.description) newItem.description = "";

    const menu = readJsonFile(MENU_FILE);

    // Generate ID
    const maxId = menu.reduce((max, item) => Math.max(max, item.id), 0);
    newItem.id = maxId + 1;

    menu.push(newItem);
    writeJsonFile(MENU_FILE, menu);

    res.json({ success: true, message: "Item added", item: newItem });
});

// 3. Update Menu Item
app.put('/api/menu/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    let menu = readJsonFile(MENU_FILE);

    const index = menu.findIndex(item => item.id === id);
    if (index !== -1) {
        menu[index] = { ...menu[index], ...updatedItem, id: id }; // Ensure ID doesn't change
        writeJsonFile(MENU_FILE, menu);
        res.json({ success: true, message: "Item updated" });
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

// 4. Delete Menu Item
app.delete('/api/menu/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let menu = readJsonFile(MENU_FILE);

    const initialLength = menu.length;
    menu = menu.filter(item => item.id !== id);

    if (menu.length < initialLength) {
        writeJsonFile(MENU_FILE, menu);
        res.json({ success: true, message: "Item deleted" });
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

// 6. Submit Order
app.post('/api/orders', (req, res) => {
    const order = req.body;

    // Validation
    if (!order.name || !order.address || !order.items || !order.totalPrice) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    order.timestamp = new Date().toISOString();
    order.status = "pending"; // Initialize with pending status

    // Generate Order ID
    order.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

    const orders = readJsonFile(ORDERS_FILE);
    orders.push(order);
    writeJsonFile(ORDERS_FILE, orders);

    console.log(`New Order Received from ${order.name}: ₹${order.totalPrice}`);
    res.json({ success: true, message: "Order placed successfully!", orderId: order.id });
});

// 6. Get Orders (Admin)
app.get('/api/orders', (req, res) => {
    let orders = readJsonFile(ORDERS_FILE);

    // Migration: Ensure all orders have IDs
    let modified = false;
    orders = orders.map(order => {
        if (!order.id) {
            order.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
            modified = true;
        }
        return order;
    });

    if (modified) {
        writeJsonFile(ORDERS_FILE, orders);
    }

    orders.reverse(); // Newest first
    res.json(orders);
});

// 7. Update Order Status
app.patch('/api/orders/:id/status', (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    const orders = readJsonFile(ORDERS_FILE);
    const orderIndex = orders.findIndex(o => o.id === id);

    if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        writeJsonFile(ORDERS_FILE, orders);
        res.json({ success: true, message: "Status updated" });
    } else {
        res.status(404).json({ error: "Order not found" });
    }
});

// 8. Delete Order
app.delete('/api/orders/:id', (req, res) => {
    const id = req.params.id;
    let orders = readJsonFile(ORDERS_FILE);

    const initialLength = orders.length;
    orders = orders.filter(o => o.id !== id);

    if (orders.length < initialLength) {
        writeJsonFile(ORDERS_FILE, orders);
        res.json({ success: true, message: "Order deleted" });
    } else {
        res.status(404).json({ error: "Order not found" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
