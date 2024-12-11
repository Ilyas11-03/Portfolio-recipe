import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Recipe from './components/Recipe';
import Signup from './components/Signup';
import Login from './components/Login';
import Footer from './components/Footer';
import MyCardSwiper from './components/Swipper';  // Importez votre composant Swiper ici
import { TailSpin } from 'react-loader-spinner';  // Importez le spinner

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement de données
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simule un chargement de 2 secondes

    return () => clearTimeout(timer); // Nettoyer le timer
  }, []);

  return (
    <Router>
      <Navbar />
      {loading ? (
        <div className="loader">
          <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" transform="translateX(20rem)" />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipe />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
      <MyCardSwiper />
      <Footer />
    </Router>
  );
};

export default App;
