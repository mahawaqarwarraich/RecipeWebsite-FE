import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/auth";  // Make sure the path is correct

const RecipeDetail = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState([]);
  const [img, setImg] = useState("");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const [recipe, setRecipe] = useState({});
  const [auth] = useAuth();  // Destructure auth from useAuth

  console.log("recipe id", id);

  // Get single recipe
  const getSingleRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:8080/recipe/single-recipe/${id}`);
      const res = await response.json();
      const data = res.data;
      setRecipe(data);
      setName(data.name);
      setIngredients(data.ingredients);
      setMethod(data.method);
      setImg(data.img);
    } catch (error) {
      console.error("Error fetching the recipe:", error);
    }
  };

  // Get comments
  const getComments = async () => {
    try {
      const response = await fetch(`http://localhost:8080/recipe/${id}/comments`);
      const res = await response.json();
      const data = res.data;
      setComments(data);
    } catch (error) {
      console.error("Error fetching the comments:", error);
    }
  };

  useEffect(() => {
    getSingleRecipe();
    getComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (commentText.trim() === "") {
      setError("Please enter a comment before submitting.");
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/recipes/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: commentText })
      });
      const res = await response.json();
      setComments([...comments, res.data]);
      setCommentText('');
    } catch (error) {
      console.error("Error adding the comment:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 mt-20 ml-20">
        <h1 className="text-xl font-semibold">{name}</h1>
        <div>
          <img src={img || '/assets/recipes/cake.png'} alt={name} className="md:w-[600px] md:h-[338px] w-[300px] h-[169px] mr-8" />
        </div>
        
        <h2 className="text-xl font-semibold">Ingredients:</h2>
        <ul className="list-disc list-inside">
          {ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        
        <h2 className="text-xl font-semibold">Method:</h2>
        <ul className="list-decimal list-inside">
          {method?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>

        {recipe?.userId === auth?.user?._id && (
          <div className="flex space-x-3 mt-8">
            <button className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-3 py-2 font-semibold rounded">Edit</button>
            <button className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-3 py-2 font-semibold rounded">Delete</button>
          </div>
        )}

        <hr className="my-8" />

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleCommentSubmit} className="flex flex-col">
            <textarea
              name="comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Enter your review"
              className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-2 border border-gray-300 rounded-md mb-2"
              rows="4"
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 self-start mt-2">
              Submit
            </button>
          </form>
        </div>

        <div className="mt-8">
          {comments.map((comment, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg mb-4">
              <p className="font-semibold">Author: {comment.author || 'Anonymous'}</p>
              <p className="mt-2">{comment.text}</p>
              <button className="text-red-500 mt-4">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
