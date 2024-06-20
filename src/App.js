import './App.css';
import Home from './components/Home';
import Recipe from './components/Recipe'; // Assuming the Recipe component is in the components folder
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm'; // Import the RecipeForm component

import Login from './components/Login'; // Import the Login component
import SignUp from './components/SignUp'; // Import the SignUp component

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
        <Route path="/login" element={<Login />} /> {/* Add this line to include the Login route */}
        <Route path="/signup" element={<SignUp />} /> {/* Add this line to include the SignUp route */}
      </Routes>

      {location.pathname !== '/' && <Footer />}
    </>
  );
}

export default App;
