import './App.css';
import Home from './components/Home';
import Recipe from './components/Recipe';
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipe />} />
        <Route path="/recipe-detail/:id" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<RecipeForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      {location.pathname !== '/' && <Footer />}
    </>
  );
}

export default App;
