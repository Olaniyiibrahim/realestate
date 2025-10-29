import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { XMarkIcon, PlusIcon, CameraIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const PropertyUploadForm = () => {
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState({
    title: '',
    price: '',
    location: '',
    beds: '',
    baths: '',
    sqft: '',
    features: '',
    type:'',
    main_image: '',
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (file, path) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const imageUrl = await handleImageUpload(file, 'main-images');
      setProperty(prev => ({ ...prev, main_image: imageUrl }));
      toast.success('Main image uploaded successfully!');
    } catch (error) {
      toast.error('Error uploading main image: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeMainImage = () => {
    setProperty(prev => ({ ...prev, main_image: '' }));
  };

  const handleMultipleImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setLoading(true);
      const uploadPromises = files.map(file => 
        handleImageUpload(file, 'gallery-images')
      );
      
      const imageUrls = await Promise.all(uploadPromises);
      
      setProperty(prev => ({ 
        ...prev, 
        images: [...prev.images, ...imageUrls]
      }));
      
      toast.success(`${files.length} images uploaded successfully!`);
    } catch (error) {
      toast.error('Error uploading images: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    setProperty(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('You must be logged in to upload properties');
        return;
      }

      // Prepare data
      const propertyData = {
        title: property.title,
        price: property.price,
        location: property.location,
        type:property.type,
        beds: parseInt(property.beds) || 0,
        baths: parseInt(property.baths) || 0,
        sqft: parseInt(property.sqft) || 0,
        features: property.features.split(',').map(f => f.trim()).filter(f => f),
        main_image: property.main_image,
        images: property.images,
        agent_id: user.id
      };

      // Insert into database
      const { data, error } = await supabase
        .from('properties')
        .insert([propertyData])
        .select()
        .single();

      if (error) throw error;

      toast.success('Property uploaded successfully!');
      
      // Reset form
      setProperty({
        title: '',
        price: '',
        location: '',
        beds: '',
        baths: '',
        sqft: '',
        features: '',
        main_image: '',
        type:'Rent',
        images: []
      });

      console.log('Property created:', data);

    } catch (error) {
      console.error('Error uploading property:', error);
      toast.error('Error uploading property: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Upload New Property</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Title *
            </label>
            <input
              type="text"
              name="title"
              value={property.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <input
              type="text"
              name="price"
              value={property.price}
              onChange={handleInputChange}
              placeholder="e.g., $2,500,000 or ₦50,000,000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={property.location}
            onChange={handleInputChange}
            placeholder="e.g., Lagos, Nigeria"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Property Details */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bedrooms
            </label>
            <input
              type="number"
              name="beds"
              value={property.beds}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bathrooms
            </label>
            <input
              type="number"
              name="baths"
              value={property.baths}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Square Feet
            </label>
            <input
              type="number"
              name="sqft"
              value={property.sqft}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sale or Rent
            </label>
          <select
              name="type"
              value={property.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
          </select>

        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features (comma separated)
          </label>
          <textarea
            name="features"
            value={property.features}
            onChange={handleInputChange}
            placeholder="e.g., Ocean view, Smart home system, Heated pool"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Main Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Property Image *
          </label>
          
          {property.main_image ? (
            <div className="relative group mb-4">
              <img
                src={property.main_image}
                alt="Main property"
                className="w-full h-64 object-cover rounded-lg border-2 border-blue-500"
              />
              <button
                type="button"
                onClick={removeMainImage}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm font-medium">
                Main Image
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors mb-4">
              <CameraIcon className="h-12 w-12 text-gray-400 mb-4" />
              <span className="text-lg text-gray-500 mb-2">Upload Main Image</span>
              <span className="text-sm text-gray-400">This will be the primary image for your property</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                className="hidden"
                disabled={loading}
              />
            </label>
          )}
        </div>

        {/* Gallery Images Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Images (Gallery)
          </label>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {property.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  {index + 1}
                </div>
              </div>
            ))}
            
            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
              <PlusIcon className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Add Images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleMultipleImagesUpload}
                className="hidden"
                disabled={loading}
              />
            </label>
          </div>
          
          {loading && (
            <p className="text-sm text-blue-600">Uploading images...</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !property.main_image}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Uploading...' : 'Upload Property'}
        </button>
      </form>
    </div>
  );
};

export default PropertyUploadForm;