import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  })

  const handleChange = (e) => {
    setFormData(wixiihore => ({
      ...wixiihore,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = formData;

    if (!email) {
      toast.error("All Feilds required ")
      return;
    }

    // forget 
    const API = import.meta.env.VITE_BACKEND_URL;

    try {
      const res = await axios.post(`${API}/auth/forgot-password`, formData)
      toast.success("Forgot Password Successfully");
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || "Error Forgot Password")
    }
  }

  return (
    <div className='h-[820px] py-20 bg-slate-100 flex items-center justify-center p-6'>
      <div className='bg-slate-50 p-8 rounded-2xl shadow-md w-full max-w-md'>
        <h1 className='text-center font-semibold text-slate-400 text-2xl'>Forget Password</h1>
        <form className='flex flex-col gap-5 pt-10' onSubmit={handleSubmit}>
          <input onChange={handleChange} id='email' name="email" type="text" className='border border-slate-400 px-4 py-2.5 rounded-md ' placeholder='YourEmail@gmail.com' />
          <button type='submit' className='px-4 py-3 rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer text-white'>Send Link</button>
          <p className="text-center text-sm text-slate-600 mt-4">
            Remember your password? {" "}
            <Link to="/login" className="text-slate-800 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword