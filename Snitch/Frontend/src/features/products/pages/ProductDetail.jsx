import React, { useState, useEffect } from 'react';
import { useProduct } from '../hook/useProduct.js';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    const { productId } = useParams();
    const { handleGetProductDetails } = useProduct();
    const productDetails = useSelector(state => state.product.productDetails);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const fetchDetails = async () => {
        await handleGetProductDetails(productId);
    };

    useEffect(() => {
        fetchDetails();
    }, [productId]);

    useEffect(() => {
        if (productDetails && productDetails.images && productDetails.images.length > 0) {
            setCurrentIndex(0);
        }
    }, [productDetails]);

    if (!productDetails) {
        return (
            <div className="min-h-screen bg-[#000000] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#000000] text-white font-['Inter'] selection:bg-[#FFD700] selection:text-black">
            {/* Minimalist Header */}
            <nav className="border-b border-[#111111] bg-[#000000] sticky top-0 z-50 bg-opacity-80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <button onClick={() => navigate(-1)} className="text-[#666666] hover:text-[#FFD700] transition-colors flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="text-xs tracking-widest uppercase font-bold hidden sm:inline">Back</span>
                        </button>
                        <span className="font-['Bodoni_Moda'] text-2xl tracking-[0.2em] text-[#FFD700] font-black uppercase">
                            Snitch
                        </span>
                        <div className="w-16"></div> {/* Spacer for alignment */}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    
                    {/* Image Gallery */}
                    <div className="flex flex-col-reverse lg:flex-row gap-6">
                        {/* Thumbnails */}
                        <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible hide-scrollbar pb-2 lg:pb-0">
                            {productDetails.images?.map((img, idx) => (
                                <button 
                                    key={img._id || idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`relative w-20 h-24 flex-shrink-0 border transition-all duration-300 ${currentIndex === idx ? 'border-[#FFD700]' : 'border-[#222222] opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                        
                        {/* Main Image */}
                        <div className="flex-1 w-full aspect-[3/4] sm:aspect-[4/5] bg-[#0A0A0A] relative group overflow-hidden border border-[#111111]">
                            {productDetails.images && productDetails.images[currentIndex] && (
                                <>
                                    <img 
                                        src={productDetails.images[currentIndex].url} 
                                        alt={productDetails.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Navigation Arrows */}
                                    {productDetails.images.length > 1 && (
                                        <>
                                            <button 
                                                onClick={() => setCurrentIndex((prev) => (prev === 0 ? productDetails.images.length - 1 : prev - 1))}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FFD700] hover:text-black"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                            </button>
                                            <button 
                                                onClick={() => setCurrentIndex((prev) => (prev === productDetails.images.length - 1 ? 0 : prev + 1))}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FFD700] hover:text-black"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <span className="text-[#FFD700] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Archive 01</span>
                        <h1 className="font-['Bodoni_Moda'] text-4xl md:text-5xl uppercase tracking-wider mb-6">
                            {productDetails.title}
                        </h1>
                        
                        <div className="text-xl tracking-widest font-light mb-8">
                            {productDetails.price?.currency === 'INR' ? '₹' : productDetails.price?.currency} 
                            {productDetails.price?.amount}
                        </div>

                        <div className="w-12 h-[1px] bg-[#333333] mb-8"></div>

                        <p className="text-[#888888] leading-relaxed mb-12 text-sm font-light">
                            {productDetails.description}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 bg-white text-black py-4 px-8 uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#FFD700] hover:text-black transition-all duration-300">
                                Buy Now
                            </button>
                            <button className="flex-1 bg-transparent border border-white text-white py-4 px-8 uppercase tracking-[0.2em] text-xs font-bold hover:bg-white hover:text-black transition-all duration-300">
                                Add to Cart
                            </button>
                        </div>
                        
                        {/* Details accordion placeholder */}
                        <div className="mt-16 space-y-6">
                            <div className="border-t border-[#111111] pt-6 flex justify-between items-center cursor-pointer group">
                                <span className="text-xs uppercase tracking-widest font-bold text-[#666666] group-hover:text-white transition-colors">Details</span>
                                <span className="text-xs text-[#666666] group-hover:text-white transition-colors">+</span>
                            </div>
                            <div className="border-t border-[#111111] pt-6 flex justify-between items-center cursor-pointer group">
                                <span className="text-xs uppercase tracking-widest font-bold text-[#666666] group-hover:text-white transition-colors">Shipping & Returns</span>
                                <span className="text-xs text-[#666666] group-hover:text-white transition-colors">+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductDetail;