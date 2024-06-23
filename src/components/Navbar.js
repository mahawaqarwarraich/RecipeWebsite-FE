import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
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

      console.log("auth value", auth?.user)

    return (
        <>
            <div className='bg-green-500 px-8 py-5'>
                <div className='flex justify-between items-center'>
                    <NavLink className='font-bold text-xl mr-50 text-white cursor-pointer' to='/recipes'>QuickRecipesHub</NavLink> {/* Use NavLink instead of anchor tag */}
                    
                    <div className='hidden sm:flex space-x-5 text-white text-xs items-center lg:text-lg lg:space-x-8'>
                        <NavLink className='cursor-pointer hover:underline' to='/'>Home</NavLink>
                        <NavLink className='cursor-pointer hover:underline' to={!auth?.user? ("/login"):("/recipes")}>All Recipes</NavLink>
                        <NavLink className='cursor-pointer hover:underline' to={!auth?.user? ("/login"):("/add-recipe")}>Upload Recipe</NavLink>
                    </div>

                   

                    <div  className='flex gap-7'>
                   <div className='flex items-center'>
                   <NavLink className='relative flex items-center justify-center ' to={!auth?.user? ("/login"):("/favourite-recipes")}>
                            <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'></path>
                            </svg>
                      </NavLink>
                   </div>
                     
                        {!auth?.user?(

                            <div className='hidden sm:flex space-x-3 items-center font-semibold'>
                                    <NavLink className='text-white' to='/login'>Login</NavLink> {/* Use NavLink instead of button */}
                                    <NavLink className='bg-white text-green-500 px-3 py-1 rounded cursor-pointer' to='/signup'>Sign up</NavLink>
                            </div>
                        ):(
                            <NavLink className='bg-white text-green-500 px-3 py-1 rounded cursor-pointer' to='/login' onClick={handleLogout}>Logout</NavLink>

                        )}
                      
                      
                       
                    </div>

                    {/* Hamburger Menu for Mobile */}
                    <div className='items-center sm:hidden'>
                        <button className='text-white' onClick={() => setIsOpen(!isOpen)}>
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
                            </svg>
                        </button>
                    </div>

                    {isOpen && (
                        <div className='sm:hidden mt-2 flex flex-col items-center space-y-2'>
                            <NavLink className='text-white cursor-pointer hover:underline' to='/'>Home</NavLink>
                            <NavLink className='text-white cursor-pointer hover:underline' to={!auth?.user? ("/login"):("/recipes")}>All Recipes</NavLink>
                            <NavLink className='text-white cursor-pointer hover:underline' to={!auth?.user? ("/login"):("/add-recipe")}>Upload Recipe</NavLink>
                            {!auth?.user ? (
                                
                                <div className='space-y-2'>
                                   
                                     <NavLink className='text-white cursor-pointer hover:underline' to='/login'>Logins</NavLink> 
                                     <NavLink className='text-white cursor-pointer hover:underline' to='/signup'>Sign Up</NavLink>
                                    </div>
                                    
                            ):(
                                <NavLink className='text-white cursor-pointer hover:underline' to='/login' onClick={handleLogout}>Logout</NavLink>

                            )}
                           
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
