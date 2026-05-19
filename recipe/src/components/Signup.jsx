import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Signup.css'
const Signup = () => {

     const success = () => {
        toast.success("Signup Successful!", {
            position: "top-center"
        });
    }
    const error = () => {
        toast.error("Signup Failed!", {
            position: "top-center"
        })
    }
  

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.username || !form.email || !form.password) {
            error();
        }else {
            success();
            localStorage.setItem('user', JSON.stringify(form))
            setTimeout(() => {
                navigate(-1);
                
            }, 2000);
            
        }
        // Handle signup logic here, e.g., send data to your backend API
        console.log(form);
          
    };

    return (
        <>
        <motion.div className="custom-shape-divider-top-1728406894" initial={{opacity: 0, x: -100}} animate={{opacity: 1 , x:0}} transition={{delay: 1.5, duration: 1, type: 'tween', stiffness: 500}}>
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
</motion.div>
        <motion.div className="form-container" initial={{opacity: 0, x: -100}} animate={{opacity: 1 , x: 0}} transition={{delay: 1.5, duration: 1, type: 'tween', stiffness: 500}} >
            <h2 className="signup">Create your account.</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter username"
                        value={form.username}
                        onChange={handleChange}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={handleChange}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    
                    />
                </div>
                <button type="submit" className="btn">Sign Up</button>
                <p className="signup-p">Already have an account? <a href="/login">Login</a></p>
                <ToastContainer/>
            </form>
        </motion.div>

        <motion.div className="custom-shape-divider-bottom-1728472316"  initial={{opacity: 0, x: -100}} animate={{opacity: 1 , x: 0}} transition={{delay: 1.5, duration: 1, type: 'tween', stiffness: 500}}>
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
    </svg>
</motion.div>
        </>
    );
};

export default Signup;
