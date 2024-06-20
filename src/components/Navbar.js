import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className='bg-green-500 px-8 py-5'>
                <div className='flex justify-between items-center'>
                    <NavLink className='font-bold text-xl mr-50 text-white cursor-pointer' to='/recipes'>QuickRecipesHub</NavLink> {/* Use NavLink instead of anchor tag */}
                    
                    <div className='hidden sm:flex space-x-5 text-white text-xs items-center lg:text-lg lg:space-x-8'>
                        <NavLink className='cursor-pointer hover:underline' to='/'>Home</NavLink>
                        <NavLink className='cursor-pointer hover:underline' to='/recipes'>All Recipes</NavLink>
                        <NavLink className='cursor-pointer hover:underline' to='/add-recipe'>Upload Recipe</NavLink>
                    </div>

                    <div className='hidden sm:flex space-x-3 font-semibold'>
                        <NavLink className='text-white' to='/login'>Login</NavLink> {/* Use NavLink instead of button */}
                        <NavLink className='bg-white text-green-500 px-3 py-1 rounded cursor-pointer' to='/signup'>Sign up</NavLink>
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
                            <NavLink className='text-white cursor-pointer hover:underline' to='/recipes'>All Recipes</NavLink>
                            <NavLink className='text-white cursor-pointer hover:underline' to='/add-recipe'>Upload Recipe</NavLink>
                            <NavLink className='text-white cursor-pointer hover:underline' to='/login'>Login</NavLink> {/* Include NavLink for login in mobile menu */}
                            <NavLink className='text-white cursor-pointer hover:underline' to='/signup'>Sign Up</NavLink>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
