// This file should be empty or contain only application-specific utilities
// Remove any source-map-support references 

// Cart functionality
let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCartCount();
    saveCartToLocalStorage();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCartToLocalStorage();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Product loading functionality
async function loadBestSellers() {
    const bestSellersGrid = document.getElementById('bestSellersGrid');
    if (!bestSellersGrid) return;

    // Mock data - replace with actual API call
    const products = [
        {
            id: 1,
            name: 'Fresh Alphonso Mangoes',
            price: '₹599',
            image: 'assets/images/mango.jpg',
            description: 'Sweet and juicy Alphonso mangoes from Ratnagiri'
        },
        {
            id: 2,
            name: 'Mumbai Masala Mix',
            price: '₹199',
            image: 'assets/images/masala.jpg',
            description: 'Authentic Mumbai street food masala mix'
        },
        {
            id: 3,
            name: 'Organic Vegetables Pack',
            price: '₹399',
            image: 'assets/images/vegetables.jpg',
            description: 'Fresh organic vegetables from local farms'
        }
    ];

    products.forEach(product => {
        const productCard = createProductCard(product);
        bestSellersGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
        <p>${product.description}</p>
        <button class="add-to-cart-btn" onclick="addToCart(${JSON.stringify(product)})">
            Add to Cart
        </button>
    `;
    return card;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromLocalStorage();
    if (document.getElementById('bestSellersGrid')) {
        loadBestSellers();
    }
}); 