import React, {useState} from 'react';
import Navlink from 'react';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
        <div className='bg-green-500 px-8 py-5'>
    
           <div className='flex justify-between items-center'>

          
           
            <a className='font-bold text-xl mr-50 text-white cursor-pointer' href='/recipes'>QuickRecipesHub</a>

            <div className='hidden sm:flex space-x-5 text-white text-xs items-center lg:text-lg lg:space-x-8'>
                <a className='cursor-pointer hover:underline' href='/'>Home</a>
                <a className='cursor-pointer hover:underline' href='/recipes'>All Recipes</a>
                <a className='cursor-pointer hover:underline' href='/add-recipe'>Upload Recipe</a>

            </div>

            <div className='hidden sm:flex space-x-3 font-semibold'>
                <button className='text-white'>Log in</button>
                <div className='bg-white text-green-500 px-3 py-1 rounded cursor-pointer'>Sign up</div>
            </div>

               {/* Hamburger Menu for Mobile */}
          <div className='items-center sm:hidden'>
            <button 
              className='text-white' 
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
              </svg>
            </button>
          </div>

          {isOpen && (
          <div className='sm:hidden mt-2 flex flex-col items-center space-y-2'>
            <a className='text-white cursor-pointer hover:underline' href='/'>
              Home
            </a>
            <a className='text-white cursor-pointer hover:underline' href='/recipes'>
              All Recipes
            </a>
            <a className='text-white cursor-pointer hover:underline' href='/add-recipe'>
              Upload Recipe
            </a>
            <a className='text-white cursor-pointer hover:underline' href='/signin'>
              Sign In
            </a>
            <a className='text-white cursor-pointer hover:underline' href='/signup'>
              Sign Up
            </a>
          </div>
        )}
            
           </div>
          </div>
        </>
    )
}

export default Navbar;