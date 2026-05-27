import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, imageUrl }) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: product.price?.currency || 'INR',
  }).format(product.price?.amount || 0);

  const navigate = useNavigate();

  // Fallback if imageUrl is missing
  const displayImage = imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800';

  return (
    <div
    onClick={() => navigate(`/seller/products/${product._id}`)}
    className="group relative bg-[#131313] flex flex-col h-full border border-[#222222] hover:border-[#FFD700] transition-colors duration-300">
      {/* Main Image Container */}
      <div 
      
      className="relative h-72 overflow-hidden bg-[#0a0a0a] border-b border-[#222222]">
        <img 
          src={displayImage} 
          alt={product.title || "Product Image"} 
          className="w-full h-full object-cover"
        />
        
        {/* Price Badge */}
        <div className="absolute top-0 right-0 bg-[#FFD700] px-4 py-2 shadow-lg z-10">
          <span className="text-black font-bold tracking-widest text-sm">{formattedPrice}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-black text-white tracking-wide uppercase font-['Bodoni_Moda'] mb-3 line-clamp-1">{product.title}</h3>
        
        <p className="text-[#888888] text-sm leading-relaxed mb-6 line-clamp-2 font-light flex-grow">
          {product.description}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-[#222222]">
          <button className="text-xs font-bold text-white tracking-widest uppercase hover:text-[#FFD700] transition-colors">
            Edit Details
          </button>
          
          <div className="flex space-x-4 text-[#555555]">
            <button className="hover:text-white transition-colors" title="Settings">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
            <button className="hover:text-red-500 transition-colors" title="Delete">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
