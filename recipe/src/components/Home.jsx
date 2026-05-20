import hotdog from "../assets/hotdogrmbg.png"
import plat from "../assets/plat2.png"
import plat2 from "../assets/plat3.png"
import plat4 from "../assets/plat4.png"
import Ducasse from "../assets/Ducasse.jpg"
import Ramsey from "../assets/ramsey.jpg"
import Massimo from "../assets/massimo.jpg"
import Redzepi from "../assets/redzepi.jpg"
import Heston from "../assets/heston.jpg"
import Thomas from "../assets/Thomas.jpg"
import img1 from "../assets/img_1.jpg"
import img2 from "../assets/img_2.jpg"
import img3 from "../assets/img_3.jpg"
import img4 from "../assets/img_4.jpg"
import img5 from "../assets/img_5.jpg"
import img6 from "../assets/img_6.jpg"
import img7 from "../assets/img_7.jpg"
import img8 from "../assets/img_8.jpg"
import img9 from "../assets/img_9.jpg"
import img10 from "../assets/img_10.jpg"
import CustomImage from "./Custom";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import Instagram from "@mui/icons-material/Instagram";
import 'aos/dist/aos.css';
// import ContactUs from "./ContactUs";
import './Home.css'



function Home() {     

    
    const images = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img9,
    ]

    const list = [
        "Learn new recepies",
        "Experiment with food",
        "Write your own recepies",
        "Know nutrition facts",
        "Get cooking tips",
        "Get ranked"
    ]
   
    return (
        <div className="Home">
        
        
    <div className="container">
            <motion.div className="tracking-in-expand" initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}} transition={{delay: 1.5, duration: 0.5, type: 'tween', stiffness: 500}}>
            <div className="title">
              <h1 style={{fontWeight: "bold"}}>Food Recipe</h1>
              <p style={{fontWeight: "100"}}>Helping you cook a variety of dishes from all over the world</p>
            </div>
           
            <div className="flip-horizontal-bottom">
            <img src={hotdog} alt="HotDog" id="pic1" />
            </div>
            </motion.div>

       
        
        <motion.div className="tracking-in-expand" initial={{opacity: 0, x: 100}} animate={{opacity: 1, x: 0}} transition={{delay: 1.5, duration: 0.5, type: 'tween', stiffness: 500}}>
        <div className="stats-container">
        <div className="stat">
            <span className="number">100+</span> <br />
            <span className="label">Recipes</span>
        </div>

        <div className="stat">
            <span className="number">800+</span> <br />
            <span className="label">Cities</span>
        </div>

        <div className="stat">
            <span className="number">5000+</span> <br />
            <span className="label">Contributors</span>
        </div>
        </div>
        </motion.div>
        </div>
       
       
         <motion.h2 
         initial={{ opacity: 0, y: -100}}
         transition={{delay: 1.5, duration: 0.5, type: 'tween', stiffness: 500}}
         whileInView={{ opacity: 1, y: 0 }}
         className="title2"
         
         >Discover Recipes of our website.</motion.h2>
         <motion.div 
         initial={{ opacity: 0, y: -50}}
         transition={{delay: 1.5, duration: 1, type: 'slide'}}
         whileInView={{ opacity: 1, y: 0 }}
         className="p2">
        <p>Here you will find one of the best recipes from all over the world</p>
        <p>Well not the best in the world , but you will find some of them😁</p>
         </motion.div>
        
         <div 
         
         className="discover">

          <img src={plat}  id="pic2" className="scroll-animation" />
           
           <img src={plat2}  id="pic3" className="scroll-animation" />
          
           <img src={plat4} id="pic4" className="scroll-animation" />
        
        </div>
        

       
        <div className="section hero">
            <div className="col">
                <h1 className="about">What Are We <br /> About</h1>
                <p className="info">FoodRecipe is a place where <br /> you can find your soul and <br /> tummy with delicious food <br />recipes of all cuisine.And our services <br /> is absolutely free.So Start Now.</p>
                <Link to="/recipe" className="btn2">Explore Now</Link>
            </div>
            <div className="col gallery">
                { images.map((src, index) => (
                     <CustomImage key={index} imgSrc={src} pt={"70%"}/>
                ))}
               
               
            </div>
        </div>

        <div className="section improve-skills">
            <div className="col img">
                <img src={img10}  id="sushi" />
            </div>
            <div className="col">
                <h1 className="improve">Improve your <br /> Culinary Skills</h1>
                <ul className="list">
                { list.map((item, index) => (
                    <li className="skill" key={index}>{item}</li>
                ))}
                </ul>
               
                <Link to="/signup" className="btn3">Sign Up Now</Link>
            </div>
            <div className="col gallery">
               
               
               
            </div>
        </div>

        <div className="quote">
        <blockquote style={{fontFamily: "Georgia ,serif"}}> <q>Food is defined as any substance that is consumed to provide nutritional support for the body. <br /> It typically contains essential nutrients such as carbohydrates, fats, proteins, vitamins, and minerals, and is necessary for growth, energy, and overall health.</q></blockquote>
        </div>

        <div className="chiefs"  >
            <h1 className="title3">Our Top Chiefs</h1>
        <div className="section-chiefs-ducasse">
            <img src={Ducasse} className="picDucasse"/>
            <h2 className="ducasse">Alain Ducasse</h2>
                <a className="instaducasse"><Instagram/></a><span className="cuisine-ducasse"><strong>Kitchen:</strong><em> France</em></span>
        </div>

        <div className="section-chiefs-ramsey">
            <img src={Ramsey} className="picRamsey"/>
            <h2 className="ramsey">Gordon Ramsey</h2>
                <a className="instaramsey"><Instagram/></a><span className="cuisine-ramsey"><strong>Kitchen:</strong><em> British</em></span>
        </div>

        <div className="section-chiefs-massimo">
            <img src={Massimo} className="picMassimo"/>
            <h2 className="massimo">Massimo Bottura</h2>
                <a className="instamassimo"><Instagram/></a><span className="cuisine-massimo"><strong>Kitchen:</strong><em>Italian</em></span>
        </div>

        <div className="section-chiefs-redzepi">
            <img src={Redzepi} className="picRedzepi"/>
            <h2 className="redzepi">René Redzepi</h2>
                <a className="instaredzepi"><Instagram/></a><span className="cuisine-redzepi"><strong>Kitchen:</strong><em>Nordic</em></span>
        </div>

        <div className="section-chiefs-heston">
            <img src={Heston} className="picHeston"/>
            <h2 className="heston">Heston Blumenthal</h2>
                <a className="instaheston"><Instagram/></a><span className="cuisine-heston"><strong>Kitchen:</strong><em>British</em></span>
        </div>

        <div className="section-chiefs-thomas">
            <img src={Thomas} className="picThomas"/>
            <h2 className="thomas">Thomas Keller</h2>
                <a className="instathomas"><Instagram/></a><span className="cuisine-redzepi"><strong>Kitchen:</strong><em>American</em></span>
        </div>

        </div>
   
    </div>
    
    

    
    
    
    )

}

export default Home;