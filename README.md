# FlavorFlow - Recipe Sharing Platform

A modern, responsive recipe sharing web application built with React, Vite, and Node.js. Discover, share, and explore culinary recipes from around the world with an interactive and engaging user interface.

![Recipe App](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.3-green) ![Node.js](https://img.shields.io/badge/Node.js-ES%20Module-brightgreen)

---

## Features

### **Home Page**
- Modern hero section with animated hero image
- Statistics showcase (100+ Recipes, 800+ Cities, 5000+ Contributors)
- Recipe discovery section with featured dishes
- Chef spotlight featuring renowned culinary professionals
- Smooth animations using Framer Motion

### **Recipe Management**
- Comprehensive recipe database with detailed information
- Search and filter recipes by cuisine, difficulty, or ingredients
- View complete recipe details including:
  - Ingredients list with measurements
  - Step-by-step preparation instructions
  - Cooking time and servings
  - Difficulty level
  - Nutritional information
- Modal-based recipe viewer with rich media support
- Like and share functionality
- Print recipe option

### **User Authentication**
- User signup with validation
- Secure login system
- User profile management
- JWT token-based authentication
- Password encryption with bcrypt

### **Responsive Design**
- Fully responsive layout for all screen sizes
- Mobile-first design approach
- Touch-friendly interface
- Optimized for tablets, phones, and desktops

### **Visual Features**
- Beautiful gradient designs and modern color scheme
- Smooth transitions and hover effects
- Image galleries with Swiper carousel
- Loading spinners and animations
- Toast notifications for user feedback

---

## Tech Stack

### Frontend
- **React** 18.3 - UI framework
- **Vite** 5.3 - Build tool and dev server
- **React Router DOM** 6.26 - Client-side routing
- **Framer Motion** 12.39 - Animation library
- **Styled Components** 6.1 - CSS-in-JS styling
- **Swiper** 11.1 - Touch slider library
- **Material-UI** 5.16 - Component library
- **Axios** 1.7 - HTTP client
- **Yup** 1.4 - Form validation


### UI/UX Enhancements
- **React Hot Toast** 2.4 - Toast notifications
- **React Toastify** 10.0 - Alternative notifications
- **React Loader Spinner** 6.1 - Loading indicators
- **React Modal** 3.16 - Modal dialogs
- **Lucide React** 1.16 - Icons
- **AOS** 2.3 - Scroll animations

---

## Project Structure

```
recipe/
├── src/
│   ├── components/
│   │   ├── Home.jsx                 # Home page component
│   │   ├── Home.css                 # Home styling
│   │   ├── Recipe.jsx               # Recipe listing & details
│   │   ├── Recipe.css               # Recipe styling
│   │   ├── Navbar.jsx               # Navigation bar
│   │   ├── Navbar.css               # Navbar styling
│   │   ├── Login.jsx                # Login page
│   │   ├── Login.css                # Login styling
│   │   ├── Signup.jsx               # Registration page
│   │   ├── Signup.css               # Signup styling
│   │   ├── Footer.jsx               # Footer component
│   │   ├── Footer.css               # Footer styling
│   │   ├── Breakfast.jsx            # Breakfast recipes
│   │   ├── Custom.jsx               # Custom recipe component
│   │   ├── Swipper.jsx              # Carousel/slider component
│   │   └── Swipper.css              # Swiper styling
│   ├── assets/
│   │   ├── hotdog.avif              # Hero image
│   │   ├── carbonara.jpg            # Recipe images
│   │   ├── plat2.png, plat3.png... # Dish images
│   │   ├── Ducasse.jpg, ramsey.jpg..# Chef images
│   │   └── img_1.jpg - img_10.jpg   # Gallery images
│   ├── App.jsx                      # Main app component
│   ├── index.css                    # Global styles
│   ├── main.jsx                     # Entry point
├── public/                          # Static files
├── package.json                     # Dependencies
├── vite.config.js                   # Vite configuration
├── index.html                       # HTML template
└── README.md                        # Documentation
```

---

## Getting Started

### Prerequisites
- **Node.js** >= 14.x
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ilyas11-03/Portfolio-recipe.git
   cd recipe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (if needed)
   ```bash
   # Create a .env file in the root directory
   # Add your configuration:
   # VITE_API_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## Authentication Flow

1. Users can **sign up** with email and password
2. Passwords are **encrypted using bcrypt**
3. Login returns a **JWT token** stored in localStorage
4. Token is used for **authenticated requests**
5. Logout removes token and clears user session

---

## Key Components

### **Home Component**
Displays the landing page with hero section, recipe showcase, and featured chefs.

### **Recipe Component**
Shows all available recipes with search, filter, and detailed view functionality.

### **Navbar Component**
Navigation header with responsive mobile menu and user authentication links.

### **Authentication (Login/Signup)**
Secure user registration and login with form validation and error handling.

### **Swiper Component**
Carousel-style gallery for browsing recipes and images.

---

## Styling Features

- **CSS Variables** for consistent theming
- **Grid & Flexbox** for responsive layouts
- **Media Queries** for mobile optimization
- **Animations** using Framer Motion
- **Hover Effects** for better interactivity
- **Dark/Light Mode** support (CSS variables)

### Color Scheme
```css
--primary-color: #8B4513;        /* Brown */
--secondary-color: #D2691E;      /* Chocolate */
--tertiary-color: #A0522D;       /* Sienna */
--light-bg: #f9f9f9;             /* Light Background */
--dark-bg: #2c2c2c;              /* Dark Background */
```

---

## Responsive Breakpoints

- **Large Screens** (1200px+): Full layout
- **Tablets** (768px - 1200px): Adjusted grid
- **Mobile** (480px - 768px): Single column, optimized
- **Small Mobile** (<480px): Minimal layout

---

## API Integration

The app communicates with a backend API for:
- User authentication (signup/login)
- Recipe management
- User data retrieval
- Recipe ratings and reviews

---

## Known Issues & Future Improvements

### Future Features
- [ ] User recipe contributions
- [ ] Recipe ratings and reviews
- [ ] Saved favorites
- [ ] Shopping list generation
- [ ] Meal planning
- [ ] Social sharing integration
- [ ] Dark mode toggle
- [ ] Multi-language support

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the MIT License.

---

## Author

**Ilyas** - [GitHub Profile](https://github.com/Ilyas11-03)

---

## Support

For support, email ilyas.aboulkassim@gmail.com or open an issue on the GitHub repository.

---

## Acknowledgments

- React community for amazing tools
- Vite for incredible build performance
- Framer Motion for smooth animations
- All contributors and recipe creators

---

## Statistics

- **100+** Recipes Available
- **800+** Cities Covered
- **5000+** Active Contributors
- **100%** Responsive Design

**Happy Cooking! 👨‍🍳**
