import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import axios from 'axios';

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [statePageNo, setPageNo] = useState(1);
  const [statePageSize] = useState(6); // Fixed pageSize, no need for state
  const [stateTotalPage, setTotalPage] = useState(0);
  const [error, setError] = useState('');
  const [auth, setAuth] = useAuth();
  const [favouriteRecipeIds, setFavouriteRecipeIds] = useState([]);

  // Fetch recipes based on pageNo
  const getRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/recipe/all-recipes?page=${statePageNo}&pageSize=${statePageSize}`);
      
      if (response.status === 200) {
        const parsedData = response.data;
        const countPage = Math.ceil(parsedData.totalRecipes / statePageSize);
        setTotalPage(countPage);
        setRecipes(parsedData.data);
      } else {
        throw new Error("Failed to fetch recipes");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to fetch recipes. Please try again later.");
    }
  };

  // Fetch favourite recipes based on pageNo
  const getFavourites = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/recipe/favourite-recipes/${auth?.user?._id}?page=${statePageNo}&pageSize=${statePageSize}`);
      
      if (response.status === 200) {
        const parsedData = response.data;
        const countPage = Math.ceil(parsedData.totalFavourites / statePageSize);
        setTotalPage(countPage);
        const ids = parsedData.data.map(fav => fav.recipeId);
        setFavouriteRecipeIds(ids);
      } else {
        throw new Error("Failed to fetch favourite recipes");
      }
    } catch (error) {
      console.error("Error fetching favourite recipes:", error);
      setError("Failed to fetch favourite recipes. Please try again later.");
    }
  };

  // Handle next page for recipes
  const handleNextRecipes = () => {
    setPageNo(prevPageNo => prevPageNo + 1);
  };

  // Handle previous page for recipes
  const handlePreviousRecipes = () => {
    setPageNo(prevPageNo => prevPageNo - 1);
  };

  // Toggle favourite status for a recipe
  const toggleFavorite = async (recipeId, index) => {
    try {
      const updatedRecipes = [...recipes];
      const isFavourite = favouriteRecipeIds.includes(recipeId);
      updatedRecipes[index].isFavourite = !isFavourite;
      setRecipes(updatedRecipes);

      // Determine endpoint and HTTP method based on current favourite status
      let endpoint, method;
      if (isFavourite) {
        endpoint = `/favourites/${recipeId}`;
        method = 'DELETE';
      } else {
        endpoint = '/favourites';
        method = 'POST';
      }

      // Send request to update favourite status
      const response = await axios({
        method,
        url: endpoint,
        data: { userId: auth?.user?._id, recipeId }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        if (method === 'DELETE') {
          setFavouriteRecipeIds(favouriteRecipeIds.filter(id => id !== recipeId));
        } else {
          setFavouriteRecipeIds([...favouriteRecipeIds, recipeId]);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error("Something went wrong in post");
    }
  };

  // Fetch recipes and favourites on initial load and when pageNo changes
  useEffect(() => {
    getRecipes();
    getFavourites();
  }, [statePageNo]); // Only re-run effect if statePageNo changes

  return (
    <>
      
      <div className="m-10">
        <div className="flex items-center my-4 mb-8">
          <div className="flex-grow border-t border-green-500"></div>
          <span className="mx-4 text-green-500 text-xl font-bold">All Recipes</span>
          <div className="flex-grow border-t border-green-500"></div>
        </div>
      </div>

      <div className="flex flex-col space-x-10 items-center justify-center lg:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((element, index) => (
            <div key={index} className="mb-5 rounded-full w-[300px] relative">
              <a href={`/recipe-detail/${element._id}`}>
                <img
                  src={element.img || '/assets/recipes/cake.png'}
                  alt={element.name || 'Recipe'}
                  className="w-full h-[169px] object-cover cursor-pointer transform transition-transform duration-300 hover:scale-110"
                />
              </a>
              <div className="absolute top-2 right-2 bg-white p-1 rounded-full cursor-pointer" onClick={() => toggleFavorite(element._id, index)}>
                {favouriteRecipeIds.includes(element._id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="green"
                    viewBox="0 0 24 24"
                    stroke="green"
                    strokeWidth="1.5"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="green"
                    strokeWidth="1.5"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                )}
              </div>
              <div className="border-gray-300 border w-[300px] p-4">
                <h2 className="text-xl cursor-pointer">{element.name}</h2>
              {/*<p className="mt-1 text-md">{new Date(element.createdAt).toISOString().split('T')[0]}</p>*/}  

              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-3 justify-center mt-6">
        <button className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-3 py-2 font-semibold rounded" disabled={statePageNo === 1} onClick={handlePreviousRecipes}>Previous</button>
        <button className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-3 py-2 font-semibold rounded" disabled={statePageNo === stateTotalPage} onClick={handleNextRecipes}>Next</button>
      </div>
    </>
  );
}

export default Recipe;
