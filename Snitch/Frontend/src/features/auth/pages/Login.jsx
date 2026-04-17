import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from "../hook/useAuth.js"
  import { useNavigate } from 'react-router-dom';
  import ContinueWithGoogle from "../components/gooleAuth.jsx"

const Login = () => {
  const { handleLogin } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    await handleLogin({ 
      email: formData.email,
      password: formData.password
    })
    navigate("/")
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex font-['Inter'] selection:bg-[#FFD700] selection:text-black">
      {/* Left Column - Fashion Editorial Image */}
      <div className="hidden md:block md:w-1/2 lg:w-3/5 relative bg-[#131313] overflow-hidden">
        {/* We use the custom generated fashion image saved in the public directory */}
        <img 
          src="/model-bg.png" 
          alt="Premium Fashion" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute bottom-12 left-8 lg:left-12 right-8 lg:right-12 text-left">
          <h1 className="text-5xl lg:text-7xl font-['Bodoni_Moda'] text-white font-bold tracking-tight mb-4 leading-tight">
            Welcome <br /> <span className="text-[#FFD700]">Back.</span>
          </h1>
          <p className="text-[#cccccc] text-base lg:text-lg font-light tracking-wide max-w-md">
            Enter your credentials to access the exclusive fashion community and your personalized wardrobe.
          </p>
        </div>
        {/* Brand mark */}
        <div className="absolute top-10 left-8 lg:left-12 flex items-center gap-3">
            <span className="font-['Bodoni_Moda'] text-3xl tracking-[0.2em] text-[#FFD700] font-black uppercase">Snitch</span>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-8 sm:p-12 xl:p-16 relative overflow-hidden bg-[#131313]">
        {/* Decorative background glow using Golden Yellow */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFD700] rounded-full blur-[180px] opacity-[0.08] pointer-events-none"></div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="md:hidden mb-10 text-center">
             <span className="font-['Bodoni_Moda'] text-4xl tracking-[0.2em] text-[#FFD700] font-black uppercase">Snitch</span>
          </div>

          <h2 className="text-4xl font-bold text-white mb-2 tracking-wide">Sign In</h2>
          <p className="text-[#aaaaaa] mb-10 text-sm font-light tracking-wide">Enter your details to access your account.</p>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Email Field */}
            <div className="relative group">
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#333333] py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors peer placeholder-transparent font-light"
                placeholder="Email Address"
              />
              <label htmlFor="email" className="absolute left-0 -top-3 text-[#777777] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#777777] peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#FFD700] uppercase tracking-wider font-medium">
                Email Address
              </label>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#333333] py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors peer placeholder-transparent font-light"
                placeholder="Password"
              />
              <label htmlFor="password" className="absolute left-0 -top-3 text-[#777777] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#777777] peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#FFD700] uppercase tracking-wider font-medium">
                Password
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#FFD700] text-black font-bold py-4 px-8 tracking-widest uppercase hover:bg-white transition-colors duration-300"
              >
                Sign In
              </button>
            </div>
            {/* Google OAuth Button */}
            <ContinueWithGoogle />
            
            <div className="text-center mt-6 pt-4 border-t border-[#222222]">
              <p className="text-[#888888] text-xs font-light">
                Don't have an account? <a href="/register" className="text-[#FFD700] hover:text-white transition-colors uppercase tracking-wider ml-1 font-medium">Sign Up</a>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
