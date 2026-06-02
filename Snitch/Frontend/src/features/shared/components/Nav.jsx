import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Nav = () => {
    const user= useSelector((state) => state.auth.user)

    const cartItems= useSelector(state=>state.cart.items)

  return (
     <nav className="border-b border-[#111111] bg-[#000000] sticky top-0 z-50 bg-opacity-80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        {/* Brand Logo */}
                        <div className="flex items-center gap-3">
                            <span className="font-['Bodoni_Moda'] text-3xl md:text-4xl tracking-[0.2em] text-[#FFD700] font-black uppercase">
                                Snitch
                            </span>
                        </div>

                     

                        {/* User / Cart Action */}
                        <div className="flex items-center gap-6">
                            {/* User Info / Login */}
                            <div className="flex items-center text-white">
                                {user ? (
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span className="text-sm font-medium hover:text-[#FFD700] transition-colors duration-300 cursor-pointer">
                                            {user?.firstName || user?.name || user?.email?.split('@')[0] || 'User'}
                                        </span>
                                    </div>
                                ) : (
                                    <Link to="/login" className="flex items-center gap-2 text-sm font-medium hover:text-[#FFD700] transition-colors duration-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Login
                                    </Link>
                                )}
                            </div>

                            {/* Cart */}
                            <Link to="/cart" className="relative inline-flex items-center justify-center bg-transparent text-white hover:text-[#FFD700] transition-colors duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {cartItems && cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#FFD700] text-[10px] font-bold text-black border-2 border-[#000000]">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
  )
}

export default Nav