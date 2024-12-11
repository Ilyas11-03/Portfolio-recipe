import React from 'react';
import './Footer.css';  // Fichier CSS séparé pour le style

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>À propos de nous</h4>
                    <p>Notre mission est de fournir un service exceptionnel et des produits de qualité.</p>
                </div>
                <div className="footer-section">
                    <h4>Contactez-nous</h4>
                    <ul>
                        <li>Email: support@exemple.com</li>
                        <li>Téléphone: +33 1 23 45 67 89</li>
                        <li>Adresse: 123, Rue de la République, Paris</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Suivez-nous</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Votre Société. Tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;
