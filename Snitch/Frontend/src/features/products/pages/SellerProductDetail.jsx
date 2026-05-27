import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../hook/useProduct.js';

const SellerProductDetail = () => {
    const { productId } = useParams();
    const { handleGetProductDetails, handleCreateProductVariant } = useProduct();
    const productDetails = useSelector(state => state.product.productDetails);
    
    // Base image viewer state
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    // New Variant Form State
    const [isAddingVariant, setIsAddingVariant] = useState(false);
    const [variantForm, setVariantForm] = useState({
        images: [],
        stock: 0,
        priceAmount: '',
        priceCurrency: 'INR',
        attributes: [{ key: '', value: '' }]
    });
    
    // Drag and Drop State
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            await handleGetProductDetails(productId);
        };
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

    const handleAddAttribute = () => {
        setVariantForm({
            ...variantForm,
            attributes: [...variantForm.attributes, { key: '', value: '' }]
        });
    };

    const handleAttributeChange = (index, field, value) => {
        const newAttributes = [...variantForm.attributes];
        newAttributes[index][field] = value;
        setVariantForm({ ...variantForm, attributes: newAttributes });
    };

    const handleRemoveAttribute = (index) => {
        const newAttributes = variantForm.attributes.filter((_, i) => i !== index);
        setVariantForm({ ...variantForm, attributes: newAttributes });
    };

    const handleMultiImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const totalImages = [...variantForm.images, ...selectedFiles].slice(0, 5); // Max 5 images
        setVariantForm({ ...variantForm, images: totalImages });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            const totalImages = [...variantForm.images, ...droppedFiles].slice(0, 5);
            setVariantForm({ ...variantForm, images: totalImages });
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = variantForm.images.filter((_, i) => i !== index);
        setVariantForm({ ...variantForm, images: newImages });
    };

    const submitVariant = async (e) => {
        e.preventDefault();
        
        // Format payload using FormData for file uploads
        const attributesMap = {};
        variantForm.attributes.forEach(attr => {
            if (attr.key && attr.value) {
                attributesMap[attr.key] = attr.value;
            }
        });

        const formData = new FormData();
        variantForm.images.forEach((file) => {
            if (file) {
                formData.append('images', file);
            }
        });
        formData.append('stock', Number(variantForm.stock));
        if (variantForm.priceAmount !== '') {
            formData.append('priceAmount', Number(variantForm.priceAmount));
        }
        formData.append('priceCurrency', variantForm.priceCurrency);
        formData.append('attributes', JSON.stringify(attributesMap));

        await handleCreateProductVariant(formData, productId);
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ', pair[1]);
        }
        alert("Variant FormData prepared! Check console.");
        
        // Reset form
        setIsAddingVariant(false);
        setVariantForm({
            images: [],
            stock: 0,
            priceAmount: '',
            priceCurrency: 'INR',
            attributes: [{ key: '', value: '' }]
        });
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white font-['Inter'] selection:bg-[#FFD700] selection:text-black">
            {/* Minimalist Header */}
            <nav className="border-b border-[#222222] bg-[#000000] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <button onClick={() => navigate(-1)} className="text-[#666666] hover:text-[#FFD700] transition-colors flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="text-xs tracking-widest uppercase font-bold hidden sm:inline">Back to Dashboard</span>
                        </button>
                        <span className="font-['Bodoni_Moda'] text-2xl tracking-[0.2em] text-[#FFD700] font-black uppercase">
                            Snitch <span className="text-[#555] text-sm ml-2">Seller</span>
                        </span>
                        <div className="w-16"></div> {/* Spacer */}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                
                {/* Product Overview Section */}
                <div className="flex flex-col md:flex-row gap-12 mb-16 border-b border-[#222] pb-16">
                    {/* Image Gallery */}
                    <div className="w-full md:w-1/2 flex flex-col-reverse lg:flex-row gap-4">
                        {/* Thumbnails */}
                        {productDetails.images && productDetails.images.length > 0 && (
                            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-2 lg:pb-0">
                                {productDetails.images.map((img, idx) => (
                                    <button 
                                        key={img._id || idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`relative w-16 h-20 flex-shrink-0 border transition-all duration-300 ${currentIndex === idx ? 'border-[#FFD700]' : 'border-[#222222] opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Main Image Viewer */}
                        <div className="flex-1 aspect-[3/4] bg-[#0A0A0A] relative group overflow-hidden border border-[#111111]">
                            {productDetails.images && productDetails.images[currentIndex] ? (
                                <>
                                    <img 
                                        src={productDetails.images[currentIndex].url} 
                                        alt={productDetails.title} 
                                        className="w-full h-full object-cover"
                                    />
                                    {productDetails.images.length > 1 && (
                                        <>
                                            <button 
                                                onClick={() => setCurrentIndex((prev) => (prev === 0 ? productDetails.images.length - 1 : prev - 1))}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FFD700] hover:text-black"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                            </button>
                                            <button 
                                                onClick={() => setCurrentIndex((prev) => (prev === productDetails.images.length - 1 ? 0 : prev + 1))}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FFD700] hover:text-black"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#333]">No Image</div>
                            )}
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1">
                        <span className="text-[#FFD700] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Base Product</span>
                        <h1 className="font-['Bodoni_Moda'] text-3xl md:text-5xl uppercase tracking-wider mb-4">
                            {productDetails.title}
                        </h1>
                        <div className="text-xl tracking-widest font-light mb-6 text-[#aaa]">
                            {productDetails.price?.currency === 'INR' ? '₹' : productDetails.price?.currency} {productDetails.price?.amount}
                        </div>
                        <p className="text-[#888888] leading-relaxed text-sm font-light max-w-2xl">
                            {productDetails.description}
                        </p>
                    </div>
                </div>

                {/* Variants Section */}
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h2 className="font-['Bodoni_Moda'] text-2xl uppercase tracking-widest mb-2">Product Variants</h2>
                        <p className="text-[#666] text-sm">Manage inventory and pricing for different versions of this piece.</p>
                    </div>
                    {!isAddingVariant && (
                        <button 
                            onClick={() => setIsAddingVariant(true)}
                            className="bg-[#FFD700] text-black px-6 py-3 uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors"
                        >
                            + Add Variant
                        </button>
                    )}
                </div>

                {/* Add Variant Form */}
                {isAddingVariant && (
                    <div className="bg-[#111] border border-[#333] p-8 mb-12 relative">
                        <button 
                            onClick={() => setIsAddingVariant(false)}
                            className="absolute top-6 right-6 text-[#666] hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        
                        <h3 className="font-['Bodoni_Moda'] text-xl uppercase tracking-widest mb-8 text-[#FFD700]">Create New Variant</h3>
                        
                        <form onSubmit={submitVariant} className="space-y-8">
                            
                            {/* Images */}
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-[#888] mb-4 font-bold">Variant Images (Optional, Up to 5 Files)</label>
                                
                                <div 
                                    className={`relative border-2 border-dashed p-8 text-center transition-colors ${isDragging ? 'border-[#FFD700] bg-[#1a1a1a]' : 'border-[#333] bg-black hover:border-[#444]'}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        multiple
                                        onChange={handleMultiImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="pointer-events-none">
                                        <svg className="w-10 h-10 mx-auto text-[#666] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                        <p className="text-sm text-[#bbb] tracking-widest uppercase font-bold">Drag & drop images here</p>
                                        <p className="text-xs text-[#666] mt-2 tracking-widest uppercase">or click to browse files</p>
                                    </div>
                                </div>

                                {variantForm.images.length > 0 && (
                                    <div className="flex flex-wrap gap-4 mt-4">
                                        {variantForm.images.map((file, idx) => (
                                            <div key={idx} className="relative w-20 h-24 border border-[#333] bg-[#111]">
                                                {file && (
                                                    <img 
                                                        src={URL.createObjectURL(file)} 
                                                        alt="Preview" 
                                                        className="w-full h-full object-cover" 
                                                    />
                                                )}
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleRemoveImage(idx)} 
                                                    className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold hover:bg-red-500"
                                                >
                                                    X
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Stock & Price */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-[#888] mb-4 font-bold">Stock Quantity</label>
                                    <input 
                                        type="number" 
                                        required
                                        min="0"
                                        value={variantForm.stock}
                                        onChange={(e) => setVariantForm({...variantForm, stock: e.target.value})}
                                        className="w-full bg-black border border-[#333] px-4 py-3 text-white focus:outline-none focus:border-[#FFD700]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-[#888] mb-4 font-bold">Price Amount (Optional)</label>
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={variantForm.priceAmount}
                                        onChange={(e) => setVariantForm({...variantForm, priceAmount: e.target.value})}
                                        className="w-full bg-black border border-[#333] px-4 py-3 text-white focus:outline-none focus:border-[#FFD700]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-[#888] mb-4 font-bold">Currency</label>
                                    <select 
                                        value={variantForm.priceCurrency}
                                        onChange={(e) => setVariantForm({...variantForm, priceCurrency: e.target.value})}
                                        className="w-full bg-black border border-[#333] px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] appearance-none"
                                    >
                                        <option value="INR">INR</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="JPY">JPY</option>
                                    </select>
                                </div>
                            </div>

                            {/* Attributes */}
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-[#888] mb-4 font-bold">Attributes (e.g. Color, Size)</label>
                                {variantForm.attributes.map((attr, idx) => (
                                    <div key={idx} className="flex gap-4 mb-3">
                                        <input 
                                            type="text" 
                                            placeholder="Key (e.g. Size)" 
                                            required
                                            value={attr.key}
                                            onChange={(e) => handleAttributeChange(idx, 'key', e.target.value)}
                                            className="flex-1 bg-black border border-[#333] px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] text-sm"
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="Value (e.g. XL)" 
                                            required
                                            value={attr.value}
                                            onChange={(e) => handleAttributeChange(idx, 'value', e.target.value)}
                                            className="flex-1 bg-black border border-[#333] px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] text-sm"
                                        />
                                        {variantForm.attributes.length > 1 && (
                                            <button type="button" onClick={() => handleRemoveAttribute(idx)} className="px-4 border border-[#333] text-[#888] hover:text-white hover:border-white">
                                                X
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button type="button" onClick={handleAddAttribute} className="text-[#FFD700] text-xs uppercase tracking-widest hover:text-white mt-2">+ Add another attribute</button>
                            </div>

                            <div className="pt-6 border-t border-[#333]">
                                <button type="submit" className="bg-white text-black px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-[#FFD700] transition-colors">
                                    Save Variant
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Existing Variants List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productDetails.variants && productDetails.variants.length > 0 ? (
                        productDetails.variants.map((variant, idx) => (
                            <div key={idx} className="border border-[#222] bg-[#050505] p-6 hover:border-[#444] transition-colors">
                                <div className="flex gap-4 mb-6">
                                    <div className="w-20 h-24 bg-[#111] overflow-hidden">
                                        {variant.images && variant.images[0] && (
                                            <img src={variant.images[0].url} alt="Variant" className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-[#FFD700] font-bold tracking-widest mb-1 text-sm">
                                            {variant.price?.currency === 'INR' ? '₹' : variant.price?.currency} {variant.price?.amount}
                                        </div>
                                        <div className="text-xs text-[#888] uppercase tracking-widest">Stock: <span className="text-white">{variant.stock}</span></div>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    {variant.attributes && Object.entries(variant.attributes).map(([key, value]) => (
                                        <div key={key} className="flex justify-between text-sm border-b border-[#111] pb-2">
                                            <span className="text-[#666]">{key}</span>
                                            <span className="text-white">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-[#555] border border-[#111] border-dashed">
                            No variants created yet.
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default SellerProductDetail;