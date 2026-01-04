const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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

// 1. Get Menu
app.get('/api/menu', (req, res) => {
    const menu = readJsonFile(MENU_FILE);
    res.json(menu);
});

// 2. Add Menu Item
app.post('/api/menu', (req, res) => {
    const newItem = req.body;
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

// 5. Submit Order
app.post('/api/orders', (req, res) => {
    const order = req.body;
    order.timestamp = new Date().toISOString();
    order.status = "pending"; // Initialize with pending status

    const orders = readJsonFile(ORDERS_FILE);
    orders.push(order);
    writeJsonFile(ORDERS_FILE, orders);

    console.log(`New Order Received from ${order.name}: ₹${order.totalPrice}`);
    res.json({ success: true, message: "Order placed successfully!" });
});

// 6. Get Orders (Admin)
app.get('/api/orders', (req, res) => {
    const orders = readJsonFile(ORDERS_FILE);
    orders.reverse(); // Newest first
    res.json(orders);
});

// 7. Update Order Status
app.patch('/api/orders/:index/status', (req, res) => {
    const index = parseInt(req.params.index);
    const { status } = req.body;

    const orders = readJsonFile(ORDERS_FILE);

    if (index >= 0 && index < orders.length) {
        orders[index].status = status;
        writeJsonFile(ORDERS_FILE, orders);
        res.json({ success: true, message: "Status updated" });
    } else {
        res.status(404).json({ error: "Order not found" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
