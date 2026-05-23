import React, { useEffect } from 'react';
import { useProduct } from '../hook/useProduct.js';
import { useSelector } from 'react-redux';
import CustomerProductCard from '../components/CustomerProductCard.jsx';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const { handleGetAllProducts } = useProduct();
    const Allproducts = useSelector((state) => state.product.products);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAll = async () => {
            await handleGetAllProducts();
        }
        fetchAll();
    }, []);

    return (
        <div className="min-h-screen bg-[#000000] text-white font-['Inter'] selection:bg-[#FFD700] selection:text-black">
            {/* Minimalist Branded Navigation Bar */}
            <nav className="border-b border-[#111111] bg-[#000000] sticky top-0 z-50 bg-opacity-80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        {/* Brand Logo */}
                        <div className="flex items-center gap-3">
                            <span className="font-['Bodoni_Moda'] text-3xl md:text-4xl tracking-[0.2em] text-[#FFD700] font-black uppercase">
                                Snitch
                            </span>
                        </div>

                        {/* Navigation Links (Visual Only) */}
                        <div className="hidden md:flex space-x-12">
                            <a href="#" className="text-xs font-bold tracking-[0.15em] uppercase text-white hover:text-[#FFD700] transition-colors">Collection</a>
                            <a href="#" className="text-xs font-bold tracking-[0.15em] uppercase text-[#666666] hover:text-[#FFD700] transition-colors">Campaigns</a>
                            <a href="#" className="text-xs font-bold tracking-[0.15em] uppercase text-[#666666] hover:text-[#FFD700] transition-colors">Maison</a>
                        </div>

                        {/* User / Cart Action */}
                        <div>
                            <button className="inline-flex items-center justify-center w-12 h-12 bg-transparent text-white hover:text-[#FFD700] transition-colors duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Hero / Header */}
                <div className="mb-24 text-center flex flex-col items-center">
                    <span className="text-[#FFD700] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Archive 01</span>
                    <h1 className="font-['Bodoni_Moda'] text-5xl md:text-7xl tracking-wider uppercase font-black mb-6">
                        The Collection
                    </h1>
                    <div className="w-12 h-[2px] bg-[#FFD700] mx-auto"></div>
                </div>

                {/* Products Grid */}
                <div>
                    {!Allproducts || Allproducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-40">
                            <div className="w-6 h-6 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin mb-6"></div>
                            <p className="text-[#666666] text-xs tracking-[0.2em] uppercase font-bold">Discovering pieces...</p>
                        </div>
                    ) : (
                        <div 
                        
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                            {Allproducts.map((product) => {
                                const images = product.images && product.images.length > 0 
                                    ? product.images 
                                    : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800'];
                                    
                                const firstImg = images[0];
                                const imgUrl = typeof firstImg === 'string' ? firstImg : firstImg.url;

                                return (
                                    <CustomerProductCard 
                                       
                                        key={product._id} 
                                        product={product} 
                                        imageUrl={imgUrl} 
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
                
                {/* Minimalist Footer Section */}
                <div className="mt-32 pt-16 border-t border-[#111111] flex flex-col items-center justify-center">
                    <span className="font-['Bodoni_Moda'] text-2xl tracking-[0.2em] text-white uppercase mb-4">Snitch</span>
                    <p className="text-[#444444] text-xs tracking-widest uppercase">The Obsidian Monolith</p>
                </div>
            </main>
        </div>
    );
}

export default Home;