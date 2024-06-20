import { useState, useEffect } from "react";

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [statePageNo, setPageNo] = useState(1);
  const [statePageSize, setPageSize] = useState(6);
  const [stateTotalPage, setTotalPage] = useState(0);

  const getRecipes = async () => {
    try {
      let myEndPoint = `http://localhost:8080/recipe/all-recipes?page=${statePageNo}&pageSize=${statePageSize}`;
      let receivedData = await fetch(myEndPoint);
      if (!receivedData.ok) {
        throw new Error("Failed to fetch recipes");
      }
      let parsedData = await receivedData.json();
      let countPage = Math.ceil(parsedData.totalRecipes / statePageSize);
      
      setTotalPage(countPage);
      setRecipes(parsedData.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleNextRecipes = async () => {
    await setPageNo(statePageNo + 1);
    let myEndpoint = `http://localhost:8080/recipe/all-recipes&page=${statePageNo}&pageSize=${statePageSize}`;
    let myData = await fetch(myEndpoint); /* Must wait for fetching */
    let parsedData = await myData.json(); /* Must wait for myData.json */
    
    setRecipes(parsedData.data);
  };

  const handlePreviousRecipes = async () => {
    await setPageNo(statePageNo - 1);
  };

  const toggleFavorite = async (index) => {
    const updatedRecipes = [...recipes];
    const recipe = updatedRecipes[index];
    updatedRecipes[index].isFavourite = !updatedRecipes[index].isFavourite;
    setRecipes(updatedRecipes);

    // const recipesArr = [...recipes];
    // const recipe = recipesArr[index];
    

    //Update the recipe in the backend
    try {
      let response = await fetch(`http://localhost:8080/recipe/toggle-favourite/${recipe._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
       
      });

      if (!response.success) { 
        throw new Error('Failed to update recipe');
      } else {
        // display notification
      }

     
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
   };

  useEffect(() => {
    getRecipes();
  }, [statePageNo]);

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
              <div className="absolute top-2 right-2 bg-white p-1 rounded-full cursor-pointer" onClick={() => toggleFavorite(index)}>
                {element.isFavourite ? (
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
                <p className="mt-1 text-lg">{element.createdAt}</p>
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
