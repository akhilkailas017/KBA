import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav>
        <div className="flex flex-row justify-between items-center w-full h-20 bg-gray-800 text-white px-10">
            <div className="flex flex-row items-center text-[55px] font-bold">Tripmate</div>
            <div className="flex flex-row items-center gap-[25px]">
                <a href="/" className="text-xl font-bold">Home</a>
                <a href="/login" className="text-xl font-bold">Login</a>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar