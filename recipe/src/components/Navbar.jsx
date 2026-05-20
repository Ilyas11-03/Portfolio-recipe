// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChefHat, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user'));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-circle">
            <ChefHat size={24} />
          </div>
          <span className="logo-text">FlavorFlow</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          {[
            { path: '/', label: 'Home' },
            { path: '/recipes', label: 'Recipes' },
            { path: '/recipe-builder', label: 'Recipe Builder' },
            { path: '/about', label: 'About' },
            { path: '/contact', label: 'Contact' }
          ].map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">Hi, <strong>{user.username}</strong></span>
              <button onClick={handleLogout} className="btn-logout" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-ghost">Login</Link>
              <Link to="/signup" className="btn-filled">Sign Up</Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button 
            className="hamburger" 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <AnimatePresence mode="wait">
              {isMobileOpen ? <X key="close" /> : <Menu key="open" />}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            <Link to="/" onClick={() => setIsMobileOpen(false)}>Home</Link>
            <Link to="/recipes" onClick={() => setIsMobileOpen(false)}>Recipes</Link>
            <Link to="/recipe-builder" onClick={() => setIsMobileOpen(false)}>Recipe Builder</Link>
            {/* <Link to="/about" onClick={() => setIsMobileOpen(false)}>About</Link> */}
            {/* <Link to="/contact" onClick={() => setIsMobileOpen(false)}>Contact</Link> */}
            
            <div className="mobile-divider"></div>
            
            {user ? (
              <button 
                className="mobile-logout" 
                onClick={() => { handleLogout(); setIsMobileOpen(false); }}
              >
                Logout ({user.username})
              </button>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login" onClick={() => setIsMobileOpen(false)}>Login</Link>
                <Link to="/signup" onClick={() => setIsMobileOpen(false)}>Sign Up</Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;