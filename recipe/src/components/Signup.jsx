// src/components/Signup.jsx
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ChefHat } from "lucide-react";
import './Signup.css';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (!form.username || !form.email || !form.password) {
        toast.error("Please fill in all fields!", { position: "top-center" });
      } else {
        toast.success("Account created successfully! 🎉", { position: "top-center" });
        localStorage.setItem('user', JSON.stringify(form));
        setTimeout(() => navigate(-1), 2000);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <ToastContainer />
      <div className="signup-page">
        <div className="signup-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
        
        <motion.div 
          className="signup-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="signup-header">
            <motion.div 
              className="logo-wrapper"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ChefHat size={48} className="logo-icon" />
            </motion.div>
            <h1>Create Account</h1>
            <p>Join our culinary community today</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <User className="input-icon" size={20} />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="signup-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  Sign Up <UserPlus size={18} />
                </>
              )}
            </motion.button>

            <p className="login-link">
              Already have an account?{' '}
              <span onClick={() => navigate('/login')} className="link">
                Login
              </span>
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Signup;