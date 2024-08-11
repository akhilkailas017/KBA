import React from 'react'
import AdminLogout from './AdminLogout'

const NavbarAdmin = () => {
  return (
    <>
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6">
       
        <div className="text-5xl font-bold mb-4 md:mb-0">Tripmate</div>

        
        <div className="flex flex-col md:flex-row md:gap-6 gap-4">
          <a href="/admin/dashboard" className="text-lg font-semibold hover:text-gray-400">Dashboard</a>
          <a href="/admin/complaintlist" className="text-lg font-semibold hover:text-gray-400">Complaints</a>
          <AdminLogout/>
        </div>
      </div>
    </nav>
    </>
  )
}

export default NavbarAdmin