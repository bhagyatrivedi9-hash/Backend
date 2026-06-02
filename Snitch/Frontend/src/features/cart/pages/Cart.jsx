import React, { useEffect } from 'react';
import { useCart } from '../hook/useCart.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { handleGetCartItems, handleDecreaseCartItem, handleIncreaseCartItem } = useCart();
  const cartData = useSelector((state) => state.cart);
  const allProducts = useSelector((state) => state.product?.products || []);
  const navigate = useNavigate();
const getCartItems = async () => {
    await handleGetCartItems();
}
  useEffect(() => {
   getCartItems();
  }, []);

  const items = cartData?.items || [];
  
  const subtotal = items.reduce((acc, item) => acc + (item.price?.amount || 0) * (item.quantity || 1), 0);
  const shipping = 100; // Static for now
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#000000] text-white font-['Inter'] selection:bg-[#FFD700] selection:text-black pb-32">
      {/* Minimalist TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#000000]/80 backdrop-blur-md border-b border-[#111111] h-16 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="hover:text-[#FFD700] transition-colors rounded-full p-2 flex items-center justify-center text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h1 className="font-['Bodoni_Moda'] text-xl tracking-widest uppercase font-bold absolute left-1/2 -translate-x-1/2">Cart</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="pt-32 px-4 max-w-4xl mx-auto space-y-12">
        {/* Header section */}
        <div className="text-center flex flex-col items-center mb-12">
            <span className="text-[#FFD700] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Your Selection</span>
            <div className="w-8 h-[1px] bg-[#FFD700] mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items List */}
          <div className="flex-1 space-y-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 border border-[#111111] p-10">
                <p className="text-[#666666] text-xs tracking-[0.2em] uppercase font-bold">Your cart is empty.</p>
              </div>
            ) : (
              items.map((item) => {
                // Find the full product details from the Redux store using the product ID
                const productId = item.product?.$oid || item.product?._id || item.product;
                const productDetails = allProducts?.find(p => p._id === productId) || item.product || {};
                
                // Find the specific variant details
                const variantId = item.variant?.$oid || item.variant?._id || item.variant;
                const variantDetails = productDetails.variants?.find(v => v._id === variantId) || item.variant || {};
                
                // Get the image (prefer variant image, fallback to product image, then dummy)
                let images = variantDetails.images && variantDetails.images.length > 0 
                    ? variantDetails.images 
                    : (productDetails.images && productDetails.images.length > 0 
                        ? productDetails.images 
                        : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200&h=300']);
                
                const firstImg = images[0];
                const imgUrl = typeof firstImg === 'string' ? firstImg : firstImg?.url;
                
                // Get variant attributes to display (e.g., Color - Size)
                const attributeText = variantDetails.attributes 
                    ? Object.values(variantDetails.attributes).join(' - ') 
                    : 'Obsidian';
                
                return (
                <div key={item._id || Math.random()} className="bg-transparent border border-[#111111] p-4 flex gap-6 transition-colors hover:border-[#333333] group">
                  <div className="w-28 h-36 bg-[#0a0a0a] overflow-hidden flex-shrink-0">
                    <img
                      alt={productDetails.name || "Product"}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      src={imgUrl}
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-grow py-1">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-wide uppercase">
                        {productDetails.name || 'Archive Piece'}
                      </h3>
                      <p className="text-xs text-[#666666] tracking-widest uppercase mt-2">{attributeText}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 border-t border-[#111111] pt-4">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={async() => await handleDecreaseCartItem({ productId: item.product._id, variantId: item.variant })}
                          className="w-8 h-8 flex items-center justify-center border border-[#333] hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
                        >
                          <span className="text-sm leading-none">-</span>
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={async() => await handleIncreaseCartItem({ productId: item.product._id, variantId: item.variant })}
                          className="w-8 h-8 flex items-center justify-center border border-[#333] hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
                        >
                          <span className="text-sm leading-none">+</span>
                        </button>
                      </div>
                      <span className="text-sm font-bold text-white tracking-wider">
                        {item.price?.currency === 'INR' ? '₹' : '$'}
                        {item.price?.amount?.toLocaleString() || '0'}
                      </span>
                    </div>
                  </div>
                </div>
              )})
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="w-full lg:w-80 flex-shrink-0">
              <section className="bg-[#050505] border border-[#111111] p-8 space-y-8 sticky top-24">
                <h2 className="text-xs font-bold text-[#FFD700] uppercase tracking-[0.2em] border-b border-[#111111] pb-4">Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#888888] text-xs tracking-widest uppercase">Subtotal</span>
                    <span className="text-sm text-white tracking-wider">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#888888] text-xs tracking-widest uppercase">Shipping</span>
                    <span className="text-sm text-white tracking-wider">₹{shipping.toLocaleString()}</span>
                  </div>
                  <div className="pt-6 border-t border-[#111111] flex justify-between items-end">
                    <span className="text-sm font-bold text-white uppercase tracking-widest">Total</span>
                    <span className="text-xl font-['Bodoni_Moda'] text-white">₹{total.toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full bg-white text-black text-xs font-bold tracking-[0.2em] uppercase py-4 hover:bg-[#FFD700] hover:text-black transition-colors duration-300">
                  Proceed to Checkout
                </button>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;