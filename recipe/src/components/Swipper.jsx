import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';  // Importation de Swiper et des slides
import 'swiper/css';  // Importation des styles de base de Swiper
import 'swiper/css/effect-cards';  // Importation des styles pour l'effet cards
import Swiper1 from '../assets/swipper1.webp'
import Swiper2 from '../assets/swipper2.jpg'
import Swiper3 from '../assets/swipper3.webp'
import Swiper4 from '../assets/swipper4.webp'
import "./Swipper.css"
import { EffectCards } from 'swiper/modules';  // Importation de l'effet cards depuis les modules de Swiper
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MyCardSwiper = () => {

    const location = useLocation();

    if (location.pathname !== '/') {
        return null;
    }
    return (
        <motion.div className='swipper' initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1.5, duration: 0.5, type: 'tween', stiffness: 500}}>
        <Swiper
            effect="cards"  // Activez l'effet cards
            grabCursor={true}  // Change le curseur en "main" pour indiquer que les cartes sont interactives
            modules={[EffectCards]}  // Ajoutez l'effet à la liste des modules utilisés
            style={{ width: '300px', height: '200px',transform: 'translate(-21em,-146em)' }}  // Dimensions personnalisées pour le swiper
        >
            {/* Chaque slide représente une "carte" */}
            <SwiperSlide>
                <div style={{ background: 'lightblue', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={Swiper1} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div style={{ background: 'lightcoral', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={Swiper2} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div style={{ background: 'lightgreen', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={Swiper3} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div style={{ background: 'lightgreen', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={Swiper4} alt="" />
                </div>
            </SwiperSlide>
            
        </Swiper>
        </motion.div>
    );
};

export default MyCardSwiper;
