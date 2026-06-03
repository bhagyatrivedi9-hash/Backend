import React, { useEffect } from 'react'
import { useProduct } from '../hook/useProduct.js'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard.jsx'

const Dashboard = () => {
    const { handleGetSellerProducts } = useProduct()
    const sellerProducts  = useSelector((state) => state.product.sellerproducts)

    useEffect(() => {
        const fetchData = async () => {
            await handleGetSellerProducts();
        };
        fetchData();
    }, [])

    return (
        <div className="min-h-screen bg-[#000000] text-white font-['Inter'] selection:bg-[#FFD700] selection:text-black">
            
            

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