import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../context/auth";
import toast from 'react-hot-toast';

const Home = () => {

    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
      };
    return (
        <div className="relative">
            <img src="/assets/recipe.jpg" className='w-full' alt="Recipe" />
            <div className='absolute inset-0 text-white flex justify-between px-14 mt-5'>
                <div>
                    <h1 className='font-bold text-xl'>QuickRecipesHub</h1>
                </div>
                <div className='font-semibold flex space-x-5'>
                    <NavLink className='cursor-pointer hover:underline' to='/'>Home</NavLink>
                    <NavLink className='cursor-pointer hover:underline' to='/recipes'>Recipes</NavLink>
                    {!auth?.user? (
                        <div className='flex space-x-5'>
                            <NavLink className='cursor-pointer hover:underline' to='/login'>Login</NavLink>
                            <NavLink className='cursor-pointer hover:underline' to='/signup'>Register</NavLink>
                            </div>
                         
                    ):(
                        <NavLink className='cursor-pointer hover:underline' to='/login'>Logout</NavLink>
                    )}
                   
                </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className='font-bold text-3xl'>QuickRecipesHub</h1>
                <div className='m-7 text-center text-black-gr'>
                    <h3>Welcome to QuickRecipesHub!</h3>
                    <p>Jump right in and explore our many recipes.</p>
                    <p>Feel free to share some of your own and comment on others!</p>
                </div>

                <NavLink className='bg-white text-black py-2 px-3 text-sm font-semibold rounded cursor-pointer' to={!auth?.user? ("/login"):("/recipes")}>View Recipes</NavLink>
            </div>
            <div className="absolute bottom-0 left-0 right-0 mt-auto text-center p-4 text-white">
                <p className="font-bold">&copy; 2024-2025 QRH</p>
            </div>
        </div>
    )
}

export default Home;
