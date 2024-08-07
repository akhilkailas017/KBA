import React from 'react'
import Logout from './Logout'

const Navbar2 = () => {
  return (
    <>
    <nav>
        <div className="flex flex-row justify-between items-center w-full h-20 bg-gray-800 text-white px-10">
            <div className="flex flex-row items-center text-[55px] font-bold">Tripmate</div>
            <div className="flex flex-row items-center gap-[25px]">
            <a href="/dashboard" className="text-xl font-bold">Dashboard</a>
                <a href="/offer" className="text-xl font-bold">Offer Ride</a>
                <a href="/profile" className="text-xl font-bold">Profile</a>
                <a href="/history" className="text-xl font-bold">History</a>
                {/* <a href="/logout" className="text-xl font-bold">Logout</a> */}
                <Logout/>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar2