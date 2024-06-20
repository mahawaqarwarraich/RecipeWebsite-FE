import './App.css';
import Home from './components/Home';
import Recipe from './components/Recipe'; // Assuming the Recipe component is in the components folder
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm'; // Import the RecipeForm component

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipe />} />
        <Route path="/recipe-detail/:id" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<RecipeForm />} /> {/* Add this line to include the RecipeForm route */}
      </Routes>

      {location.pathname !== '/' && <Footer />}
    </>
  );
}

export default App;
