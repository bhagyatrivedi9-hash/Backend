import React, { useState } from 'react';
import { useProduct } from '../hook/useProduct';
import { useNavigate } from 'react-router-dom'; 
const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceAmount: '',
    priceCurrency: 'INR',
    images: []
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 5) {
      alert('You can only upload up to 5 images in total.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5)
    }));
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
    
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    if (files.length === 0) return;
    
    if (formData.images.length + files.length > 5) {
      alert('You can only upload up to 5 images in total.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5)
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Product Form Submitted:', formData);
    
    const apiFormData = new FormData();
    apiFormData.append('title', formData.title);
    apiFormData.append('description', formData.description);
    apiFormData.append('priceAmount', formData.priceAmount);
    apiFormData.append('priceCurrency', formData.priceCurrency);
    
    formData.images.forEach((img) => {
      apiFormData.append('images', img);
    });

    try {
      await handleCreateProduct(apiFormData);
      alert('Product created successfully!');
      // Reset form if needed, or redirect
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    }
    setFormData({
      title: '',
      description: '',
      priceAmount: '',
      priceCurrency: 'INR',
      images: []
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex font-['Inter'] selection:bg-[#FFD700] selection:text-black">
      {/* Left Column - Fashion Editorial Image */}
      <div className="hidden md:block md:w-1/2 lg:w-3/5 relative bg-[#131313] overflow-hidden">
        {/* Placeholder for product creation hero image */}
        <img
          src="/model-bg.png"
          alt="Premium Fashion"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute bottom-12 left-8 lg:left-12 right-8 lg:right-12 text-left">
          <h1 className="text-5xl lg:text-7xl font-['Bodoni_Moda'] text-white font-bold tracking-tight mb-4 leading-tight uppercase">
            Archive <br /> <span className="text-[#FFD700]">New Piece.</span>
          </h1>
          <p className="text-[#cccccc] text-base lg:text-lg font-light tracking-wide max-w-md uppercase">
            Curate your collection. Add new avant-garde items to the Snitch digital atelier.
          </p>
        </div>
        {/* Brand mark */}
        <div className="absolute top-10 left-8 lg:left-12 flex items-center gap-3">
          <span className="font-['Bodoni_Moda'] text-3xl tracking-[0.2em] text-[#FFD700] font-black uppercase">Snitch</span>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center p-8 sm:p-12 xl:p-16 relative overflow-y-auto bg-[#131313]">
        {/* Decorative background glow using Golden Yellow */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFD700] rounded-full blur-[180px] opacity-[0.05] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10 mx-auto">
          <div className="md:hidden mb-10 text-center">
            <span className="font-['Bodoni_Moda'] text-4xl tracking-[0.2em] text-[#FFD700] font-black uppercase">Snitch</span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 tracking-widest uppercase">List New Piece</h2>
          <p className="text-[#aaaaaa] mb-10 text-sm font-light tracking-wide uppercase">Enter the narrative & composition.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Field */}
            <div className="relative group">
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#333333] py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors peer placeholder-transparent font-light rounded-none"
                placeholder="Piece Name"
              />
              <label htmlFor="title" className="absolute left-0 -top-3 text-[#777777] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#777777] peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#FFD700] uppercase tracking-wider font-medium">
                Piece Name
              </label>
            </div>

            {/* Description Field */}
            <div className="relative group">
              <textarea
                id="description"
                name="description"
                required
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#333333] py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors peer placeholder-transparent font-light resize-none rounded-none"
                placeholder="Narrative & Composition"
              />
              <label htmlFor="description" className="absolute left-0 -top-3 text-[#777777] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#777777] peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#FFD700] uppercase tracking-wider font-medium">
                Narrative & Composition
              </label>
            </div>

            {/* Price & Currency Split */}
            <div className="flex gap-6">
              <div className="relative group flex-1">
                <input
                  type="number"
                  id="priceAmount"
                  name="priceAmount"
                  required
                  min="0"
                  step="0.01"
                  value={formData.priceAmount}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#333333] py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors peer placeholder-transparent font-light rounded-none"
                  placeholder="Price"
                />
                <label htmlFor="priceAmount" className="absolute left-0 -top-3 text-[#777777] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#777777] peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#FFD700] uppercase tracking-wider font-medium">
                  Price
                </label>
              </div>
              <div className="relative group w-1/3">
                <select
                  id="priceCurrency"
                  name="priceCurrency"
                  value={formData.priceCurrency}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#333333] py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors peer font-light appearance-none rounded-none cursor-pointer"
                >
                  <option value="USD" className="bg-[#131313] text-white">USD</option>
                  <option value="EUR" className="bg-[#131313] text-white">EUR</option>
                  <option value="GBP" className="bg-[#131313] text-white">GBP</option>
                  <option value="INR" className="bg-[#131313] text-white">INR</option>
                </select>
                <label htmlFor="priceCurrency" className="absolute left-0 -top-3 text-[#FFD700] text-xs uppercase tracking-wider font-medium">
                  Currency
                </label>
                <div className="absolute right-0 top-4 pointer-events-none text-[#777777]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Images Upload */}
            <div className="pt-2">
              <label className="block text-[#777777] text-xs uppercase tracking-wider font-medium mb-3">
                Imagery (Max 5)
              </label>
              <div 
                className={`grid grid-cols-5 gap-2 p-2 -m-2 transition-all duration-300 ${isDragging ? 'bg-[#1a1a1a] border border-dashed border-[#FFD700]' : 'bg-transparent border border-transparent'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square bg-[#0E0E0E] group">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Upload ${idx}`}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute inset-0 m-auto w-6 h-6 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FFD700] hover:text-black rounded-none"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {formData.images.length < 5 && (
                  <label className="aspect-square bg-[#1b1b1b] hover:bg-[#222222] border border-[#333333] hover:border-[#FFD700] flex items-center justify-center cursor-pointer transition-colors duration-300 rounded-none">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <svg className="w-6 h-6 text-[#777777]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                    </svg>
                  </label>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <button
                type="submit"
                className="w-full bg-[#FFD700] text-black font-bold py-4 px-8 tracking-widest uppercase hover:bg-white transition-colors duration-300 rounded-none"
              >
                Finalize Listing
              </button>
            </div>
            
            <div className="text-center mt-6 pt-4 border-t border-[#222222]">
              <button type="button" className="text-[#888888] text-xs font-light hover:text-white transition-colors uppercase tracking-wider font-medium">
                Save as Draft
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
