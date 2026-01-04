// Language translations
const translations = {
    en: {
        fruits: 'Fruits',
        vegetables: 'Vegetables',
        spices: 'Spices',
        dairy: 'Dairy',
        search: 'Search products...',
        deals: 'Special Deals',
        bestSellers: 'Best Sellers',
        addToCart: 'Add to Cart',
        viewDetails: 'View Details',
        categories: 'Shop by Category',
        price: 'Price',
        quantity: 'Quantity',
        total: 'Total'
    },
    hi: {
        fruits: 'फल',
        vegetables: 'सब्जियां',
        spices: 'मसाले',
        dairy: 'डेयरी',
        search: 'उत्पाद खोजें...',
        deals: 'विशेष ऑफर',
        bestSellers: 'बेस्ट सेलर',
        addToCart: 'कार्ट में डालें',
        viewDetails: 'विवरण देखें',
        categories: 'श्रेणियों द्वारा खरीदारी करें',
        price: 'कीमत',
        quantity: 'मात्रा',
        total: 'कुल'
    }
};

// Initialize location-based features
function initializeLocationFeatures() {
    // Get user's location (with permission)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            updateLocationBasedContent(latitude, longitude);
        }, error => {
            console.log('Error getting location:', error);
            // Use default Mumbai location
            updateLocationBasedContent(19.0760, 72.8777);
        });
    }
}

// Update content based on location
function updateLocationBasedContent(lat, lng) {
    // Update greeting with local area name
    updateGreeting();
    
    // Load local deals
    loadLocalDeals(lat, lng);
    
    // Update delivery time estimates
    updateDeliveryEstimates(lat, lng);
}

// Update greeting based on time of day and location
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Namaste';
    
    if (hour < 12) {
        greeting += ', सुप्रभात!';
    } else if (hour < 17) {
        greeting += ', नमस्कार!';
    } else {
        greeting += ', शुभ संध्या!';
    }
    
    document.getElementById('userGreeting').textContent = greeting;
}

// Load local deals based on location
function loadLocalDeals(lat, lng) {
    // This would typically fetch from an API
    const mockDeals = [
        {
            title: 'Vada Pav Combo Pack',
            description: 'All ingredients for Mumbai\'s favorite snack!',
            price: '₹199',
            discount: '20% off'
        },
        {
            title: 'Fresh Vegetables Pack',
            description: 'Local farm fresh vegetables',
            price: '₹299',
            discount: '15% off'
        },
        {
            title: 'Mumbai Spices Set',
            description: 'Essential spices for Mumbai cuisine',
            price: '₹399',
            discount: '10% off'
        }
    ];
    
    // Update deals section
    updateDealsSection(mockDeals);
}

// Update delivery estimates based on location and traffic
function updateDeliveryEstimates(lat, lng) {
    // This would typically use a traffic API
    const mockEstimate = '30-45 minutes';
    // Update delivery time display
    const deliveryElement = document.getElementById('deliveryEstimate');
    if (deliveryElement) {
        deliveryElement.textContent = `Estimated Delivery: ${mockEstimate}`;
    }
}

// Voice search functionality
function startVoiceSearch() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'hi-IN'; // Set to Hindi, can be made configurable
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('searchInput').value = transcript;
            // Trigger search with transcript
            searchProducts(transcript);
        };
        
        recognition.start();
    } else {
        alert('Voice search is not supported in your browser');
    }
}

// Search products
function searchProducts(query) {
    // Implement product search functionality
    console.log('Searching for:', query);
    // This would typically make an API call to search products
}

// Load promotional banners
function loadPromotionalBanners() {
    const banners = [
        {
            image: 'assets/images/banner1.jpg',
            title: 'Mumbai Morning Special',
            link: '#morning-deals'
        },
        {
            image: 'assets/images/banner2.jpg',
            title: 'Fresh Vegetables',
            link: '#fresh-veggies'
        },
        {
            image: 'assets/images/banner3.jpg',
            title: 'Local Spices',
            link: '#spices'
        }
    ];
    
    const carousel = document.getElementById('bannerCarousel');
    banners.forEach(banner => {
        const div = document.createElement('div');
        div.className = 'banner-slide';
        div.innerHTML = `
            <a href="${banner.link}">
                <img src="${banner.image}" alt="${banner.title}">
            </a>
        `;
        carousel.appendChild(div);
    });
    
    // Initialize banner rotation
    initBannerRotation();
}

// Initialize banner rotation
function initBannerRotation() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.banner-slide');
    
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        document.getElementById('bannerCarousel').style.transform = 
            `translateX(-${currentSlide * 100}%)`;
    }, 5000);
}

const mumbaiTerms = {
    'Fruits': 'फळे',
    'Vegetables': 'भाजीपाला',
    'Dairy': 'डेअरी',
    'Cart': 'कार्ट',
    'Checkout': 'पेमेंट'
};

function localizeText(element) {
    if(navigator.language === 'mr-IN') {
        element.textContent = mumbaiTerms[element.textContent] || element.textContent;
    }
} 