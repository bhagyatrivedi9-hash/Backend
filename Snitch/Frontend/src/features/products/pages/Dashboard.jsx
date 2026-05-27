import React, { useEffect } from 'react'
import { useProduct } from '../hook/useProduct.js'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard.jsx'

const Dashboard = () => {
    const { handleGetSellerProducts } = useProduct()
    const sellerProducts = useSelector((state) => state.product.sellerproducts)

    useEffect(() => {
        const fetchData = async () => {
            await handleGetSellerProducts();
        };
        fetchData();
    }, [])

    return (
        <div className="min-h-screen bg-[#000000] text-white font-['Inter'] selection:bg-[#FFD700] selection:text-black">
            
            {/* Branded Navigation Bar */}
            <nav className="border-b border-[#222222] bg-[#000000] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        {/* Brand Logo */}
                        <div className="flex items-center gap-3">
                            <span className="font-['Bodoni_Moda'] text-3xl md:text-4xl tracking-[0.2em] text-[#FFD700] font-black uppercase">
                                Snitch
                            </span>
                            <span className="hidden md:inline-block ml-4 pl-4 border-l border-[#333333] text-[#777777] text-xs font-medium tracking-widest uppercase">
                                Seller Atelier
                            </span>
                        </div>

                        {/* Add Option */}
                        <div>
                            <button className="inline-flex items-center justify-center px-6 py-3 bg-[#FFD700] text-black text-sm font-bold tracking-widest uppercase hover:bg-white transition-colors duration-300">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Piece
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Products Grid */}
                <div>
                    {!sellerProducts || sellerProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 bg-[#131313] border border-[#222222]">
                            <h3 className="text-2xl font-bold text-white mb-4 tracking-widest font-['Bodoni_Moda'] uppercase">Empty Archive</h3>
                            <p className="text-[#aaaaaa] text-center max-w-md mb-8 font-light tracking-wide">
                                You haven't added any pieces to your archive yet.
                            </p>
                            <button className="px-8 py-3 border border-[#333333] text-white hover:border-[#FFD700] hover:text-[#FFD700] transition-colors uppercase tracking-widest text-sm font-bold">
                                Add Your First Piece
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {sellerProducts.map((product) => {
                                const images = product.images && product.images.length > 0 
                                    ? product.images 
                                    : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800'];
                                    
                                const firstImg = images[0];
                                const imgUrl = typeof firstImg === 'string' ? firstImg : firstImg.url;

                                return (
                                    <ProductCard 
                                        key={product._id} 
                                        product={product} 
                                        imageUrl={imgUrl} 
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Dashboard