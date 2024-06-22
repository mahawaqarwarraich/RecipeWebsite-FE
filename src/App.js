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
import Favourite from './components/Favourite';
import { Toaster } from 'react-hot-toast';

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
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/favourite-recipes" element={<Favourite />} />
      </Routes>

      {location.pathname !== '/' && <Footer />}
      <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
    </>
  );
}

export default App;