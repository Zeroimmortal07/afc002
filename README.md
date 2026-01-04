# AMMA Food Center - Mumbai Local Grocery App

A modern, localized grocery shopping experience for Mumbai residents. This web application provides a seamless shopping experience with support for multiple languages and local cultural preferences.

## Features

- **Multilingual Support**: English and Hindi interface
- **Location-Based Services**: 
  - Personalized greetings
  - Local deals and offers
  - Delivery time estimates based on traffic
- **Voice Search**: Support for multiple languages
- **Local Cultural Integration**:
  - Mumbai-specific products and deals
  - Festive offers and seasonal promotions
- **User-Friendly Interface**:
  - Intuitive category navigation
  - Quick access to favorite items
  - Easy checkout process

## Project Structure

```
/grocery-app-mumbai/
├── index.html           # Home Screen
├── product-list.html    # Product List Screen
├── product-details.html # Product Details Screen
├── cart.html           # Cart Screen
├── checkout.html       # Checkout Screen
├── assets/
│   ├── css/
│   │   └── style.css   # Main stylesheet
│   ├── js/
│   │   ├── common.js   # Common functionality
│   │   └── localization.js # Language and location features
│   └── images/         # Product and banner images
└── README.md           # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd grocery-app-mumbai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the necessary API keys and configuration

4. Run the development server:
   ```bash
   npm start
   ```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Font Awesome](https://fontawesome.com)
- Images sourced from [Unsplash](https://unsplash.com)
- Localization support powered by custom translation engine 