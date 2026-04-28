import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='h-screen bg-slate-500 max-w-2xl py-10 px-5'>
      <img src="./logo.png" alt="" className='w-56 bg-white p-2 rounded-md' />

      <ul className='flex flex-col gap-5 mt-5 '>
        <li className='bg-white px-4 py-2 rounded cursor-pointer text-slate-500'><Link to="/dashboard">Dashboard</Link></li>
        <li className='bg-white px-4 py-2 rounded cursor-pointer text-slate-500'><Link to="/add-product">Add Product</Link></li>
        <li className='bg-white px-4 py-2 rounded cursor-pointer text-slate-500'><Link to="/products">Products</Link></li>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-transparent text-white border border-white px-4 py-2 rounded cursor-pointer"
        >
          Logout Account
        </button>
      </ul>

    </div>
  )
}

export default Sidebar