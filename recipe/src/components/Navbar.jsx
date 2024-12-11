import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assurez-vous d'avoir un fichier CSS pour les styles

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo" style={{fontSize: "20px", color:"BLACK"}}>
         <Link to={"/"} style={{textDecoration:'none',color:"black"}}>
         <h4>FoodRecipe🍽🍝</h4>
         </Link>
          
         
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <span className="close-icon">✖</span>
          ) : (
            <span className="menu-icon">☰</span>
          )}
        </div>

        {/* Menu */}
        <div className={`menu ${isOpen ? 'open' : ''}`}>

          <Link to={"/"}>Home</Link>
          <Link to={"/recipes"}>Recipes🥗🍲</Link>
         <Link to={"/signup"}>Sign up</Link>
          <Link to={"/login"}>Login</Link>         
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
