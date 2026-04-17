import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import  {useAuth} from "../hook/useAuth.js"
import {   useNavigate } from 'react-router-dom';
import  ContinueWithGoogle  from "../components/gooleAuth.jsx"
const Register = () => {
  const {handleRegister}= useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    contact: '',
    password: '',
    isSeller: false
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    await handleRegister({ 
      email:formData.email,
      contact:formData.contact,
      password:formData.password,
      fullname:formData.fullname,
      isSeller:formData.isSeller
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
            Elevate <br /> <span className="text-[#FFD700]">Your Style.</span>
          </h1>
          <p className="text-[#cccccc] text-base lg:text-lg font-light tracking-wide max-w-md">
            Join the exclusive fashion community. Discover the latest avant-garde collections and redefine your wardrobe.
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

          <h2 className="text-4xl font-bold text-white mb-2 tracking-wide">Create Account</h2>
          <p className="text-[#aaaaaa] mb-10 text-sm font-light tracking-wide">Enter your details and join Snitch today.</p>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Name Field */}
            <div className="relative group">
              <input
                type="text"
                id="fullname"
                name="fullname"
                required
                value={formData.fullname}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#333333] py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors peer placeholder-transparent font-light"
                placeholder="Full Name"
              />
              <label htmlFor="fullname" className="absolute left-0 -top-3 text-[#777777] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#777777] peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#FFD700] uppercase tracking-wider font-medium">
                Full Name
              </label>
            </div>

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

            {/* Contact Field */}
            <div className="relative group">
              <input
                type="tel"
                id="contact"
                name="contact"
                required
                value={formData.contact}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#333333] py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors peer placeholder-transparent font-light"
                placeholder="Contact Number"
              />
              <label htmlFor="contact" className="absolute left-0 -top-3 text-[#777777] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#777777] peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#FFD700] uppercase tracking-wider font-medium">
                Phone Number
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

            {/* Buyer / Seller Checkbox */}
            <div className="pt-2 flex items-center gap-3">
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="isSeller"
                  name="isSeller"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 flex items-center justify-center border-2 border-[#555555] rounded-sm bg-transparent peer-checked:bg-[#FFD700] peer-checked:border-[#FFD700] hover:border-[#FFD700] transition-all duration-300">
                  <svg className="w-3.5 h-3.5 text-[#000000] opacity-0 peer-checked:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-3 text-[#cccccc] select-none text-sm font-light hover:text-[#FFD700] transition-colors duration-300">
                  Register as a Seller
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#FFD700] text-black font-bold py-4 px-8 tracking-widest uppercase hover:bg-white transition-colors duration-300"
              >
                Create Account
              </button>
            </div>
            {/* Google OAuth Button */}
            <ContinueWithGoogle />
            
            <div className="text-center mt-6 pt-4 border-t border-[#222222]">
              <p className="text-[#888888] text-xs font-light">
                Already have an account? <a href="/login" className="text-[#FFD700] hover:text-white transition-colors uppercase tracking-wider ml-1 font-medium">Sign In</a>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;