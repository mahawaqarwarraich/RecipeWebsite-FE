import React from 'react';

const Home = () => {
    return (
        <div class="relative">
        <img src="/assets/recipe.jpg" className='w-full'/>
        <div className='absolute inset-0 text-white flex justify-between px-14 mt-5'>
            <div>
                <h1 className='font-bold text-xl'>QuickRecipesHub</h1>
            </div>
            <div className='font-semibold flex space-x-5'>
                <a className='cursor-pointer hover:underline'>Home</a>
                <a className='cursor-pointer'>Recipes</a>
                <a className='cursor-pointer'>Login</a>
                <a className='cursor-pointer'>Register</a>
            </div>

        </div>
        <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className='font-bold text-3xl'>QuickRecipesHub</h1>
          <div className='m-7 text-center text-black-gr'>
          <h3>Welcome to QuickRecipesHub!</h3>
          <p>Jump right in and explore our many recipes.</p>
          <p>Feel free to share some of your own and comment on others!</p>
          </div>
         <a className='bg-white text-black py-2 px-3 text-sm font-semibold rounded cursor-pointer' href="/recipes">View Recipes</a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 mt-auto text-center p-4 text-white">
        <p className="font-bold">&copy; 2024-2025 QRH</p>
      </div>
      </div>
    )
}

export default Home;