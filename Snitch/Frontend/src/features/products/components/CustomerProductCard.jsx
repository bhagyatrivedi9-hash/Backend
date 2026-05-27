import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerProductCard = ({ product, imageUrl }) => {
  const navigate = useNavigate();
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: product.price?.currency || 'INR',
  }).format(product.price?.amount || 0);

  const displayImage = imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800';

  return (
     <div 
         onClick={() => navigate(`/products/${product._id}`)}  
     className="group relative bg-[#0e0e0e] flex flex-col h-full hover:bg-[#131313] transition-colors duration-500 overflow-hidden cursor-pointer">
      {/* Main Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a]">
        <img 
          src={displayImage} 
          alt={product.title || "Product Image"} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Price Badge */}
        <div className="absolute bottom-0 left-0 bg-[#FFD700] px-5 py-3 shadow-lg">
          <span className="text-black font-bold tracking-widest text-sm">{formattedPrice}</span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-6 pb-2 flex flex-col flex-grow items-center text-center">
        <h3 className="text-lg font-bold text-white tracking-[0.1em] uppercase font-['Epilogue'] mb-2 line-clamp-1 group-hover:text-[#FFD700] transition-colors duration-300">
          {product.title}
        </h3>
        
        <p className="text-[#666666] text-xs tracking-widest uppercase font-light mb-4">
          Archive
        </p>
      </div>
    </div>
  )
}

export default CustomerProductCard;
