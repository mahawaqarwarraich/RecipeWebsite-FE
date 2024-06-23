import React, { useState } from 'react';
import { useAuth } from '../context/auth';

const RecipeForm = () => {
  const [auth,setAuth] = useAuth();

  const [formData, setFormData] = useState({
    recipeImage: null,
    recipeName: '',
    ingredients: '',
    method: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.recipeImage) newErrors.recipeImage = true;
    if (!formData.recipeName.trim()) newErrors.recipeName = true;
    if (!formData.ingredients.trim()) newErrors.ingredients = true;
    if (!formData.method.trim()) newErrors.method = true;
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Prepare the data to be sent in the POST request
      const data = new FormData();
      data.append('recipeImage', formData.recipeImage);
      data.append('recipeName', formData.recipeName);
      data.append('ingredients', JSON.stringify(formData.ingredients.split(',').map(item => item.trim())));
      data.append('method', JSON.stringify(formData.method.split(',').map(item => item.trim())));

      try {
        const response = await fetch('/api/recipes/create-recipe', {
          method: 'POST',
          body: data,
        });

        if (response.ok) {
          alert('Recipe uploaded successfully!');
          setFormData({
            recipeImage: null,
            recipeName: '',
            ingredients: '',
            method: '',
          });
        } else {
          alert('Failed to upload recipe.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading the recipe.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
  
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Recipe Image</label>
            <input
              type="file"
              name="recipeImage"
              accept="image/*"
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.recipeImage ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Recipe Name</label>
            <input
              type="text"
              name="recipeName"
              placeholder="Enter recipe name"
              value={formData.recipeName}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.recipeName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ingredients</label>
            <input
              type="text"
              name="ingredients"
              placeholder="Enter ingredients, separated by commas"
              value={formData.ingredients}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.ingredients ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Method</label>
            <input
              type="text"
              name="method"
              placeholder="Enter steps, separated by commas"
              value={formData.method}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.method ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
