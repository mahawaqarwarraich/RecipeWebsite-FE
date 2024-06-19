



function Footer() {
    return (
      
     <>
    <div className='bg-green-500 px-8 py-5 flex flex-col items-center justify-center text-white mt-10'>
    <h1 className="text-lg">Follow us</h1>
    <div className='flex flex-col sm:flex-row sm:space-x-5 space-x-3 mt-5 mb-5'>
     <a className='text-lg  cursor-pointer hover:underline'>Instagram</a>
     <a className='text-lg  cursor-pointer hover:underline'>Facebook</a>
     <a className='text-lg cursor-pointer  hover:underline'>Linked in</a>
     <a className='text-lg cursor-pointer  hover:underline'>Youtube</a>
    </div>
    <p className="font-bold">&copy; 2024-2025 QRH</p>

   </div>
     
     </>
    );
  }
  export default Footer