import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ChefHat } from "lucide-react";
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const storedUser = JSON.parse(localStorage.getItem('user'));

    setTimeout(() => {
      if (!form.email || !form.password) {
        toast.error("Please fill in all fields!", { position: "top-center" });
      } else if (storedUser && storedUser.email === form.email && storedUser.password === form.password) {
        toast.success("Login Successful! Welcome back 🎉", { position: "top-center" });
        setTimeout(() => navigate(-1), 2000);
      } else {
        toast.error("Invalid credentials! Please try again.", { position: "top-center" });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <ToastContainer />
      <div className="login-page">
        <div className="login-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
        
        <motion.div 
          className="login-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="login-header">
            <motion.div 
              className="logo-wrapper"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ChefHat size={48} className="logo-icon" />
            </motion.div>
            <h1>Welcome Back</h1>
            <p>Login to continue your culinary journey</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
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
              className="login-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  Login <ArrowRight size={18} />
                </>
              )}
            </motion.button>

            <p className="signup-link">
              Don't have an account?{' '}
              <span onClick={() => navigate('/signup')} className="link">
                Sign Up
              </span>
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Login;