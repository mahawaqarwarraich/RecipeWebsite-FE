import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState([]);
  const [img, setImg] = useState("");

  // Get single product
  const getSingleRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:8080/recipe/single-recipe/${id}`);
      const res = await response.json();
      const data = res.data;
        console.log("response", data)
      console.log("ingredients", data.ingredients)
      setName(data.name);
      setIngredients(data.ingredients);
      setMethod(data.method);
      setImg(data.img);
    } catch (error) {
      console.error("Error fetching the recipe:", error);
    }
  };

  useEffect(() => {
    getSingleRecipe();
  }, [id]);

  return (
    <>
      <div className="flex flex-col gap-5 mt-8 ml-11">
        <h1 className="text-xl font-semibold">{name}</h1>
        <div>
        <img src={img || '/assets/recipes/cake.png'} alt={name} className="md:w-[600px] md:h-[338px] w-[300] h-[169] mr-8" />
       
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
        
        <div className="flex space-x-3 mt-8">
          <button className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-3 py-2 font-semibold rounded">Edit</button>
          <button className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-3 py-2 font-semibold rounded">Delete</button>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
