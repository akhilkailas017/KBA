import React from 'react'
import AdminLogout from './AdminLogout'

const NavbarAdmin = () => {
  return (
    <>
     <nav className='w-full'>
        <div className="flex flex-row justify-between items-center h-20 bg-gray-800 text-white px-10">
            <div className="flex flex-row items-center text-[55px] font-bold">Tripmate</div>
            <div className="flex flex-row items-center gap-[25px]">
                <AdminLogout/>
            </div>
        </div>
    </nav>
    
    </>
  )
}

export default NavbarAdmin