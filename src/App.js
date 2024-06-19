import './App.css';
import Home from './components/Home';
import Recipe from './components/Recipe'; // Assuming the Recipe component is in the components folder
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecipeDetail from './components/RecipeDetail';

function App() {
  const location = useLocation();
  return (
    <>
   
    {location.pathname !== '/' && <Navbar />}

      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipe />} />
        <Route path="/recipe-detail/:id" element={<RecipeDetail/>} />
      </Routes>
      
       
      {location.pathname !== '/' && <Footer />}
     
    </>
  );
}

export default App;
