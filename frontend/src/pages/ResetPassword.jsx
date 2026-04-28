import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useAsyncError, useSearchParams } from 'react-router-dom'
import axios from 'axios'
const ResetPassword = () => {
  const [newPassword, setPassword] = useState('')
  const [ params ] = useSearchParams()
  const token = params.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast.error("All Feilds required ")
      return;
    }


    const API = import.meta.env.VITE_BACKEND_URL;

    // reset 
    try {
      const res = await axios.post(`${API}/auth/reset-password`, { newPassword, token })
      toast.success("Reset Password Successfully");
      navigate('/login')
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Error Reset Password")
    }
  }

  return (
    <div className='h-[820px] py-20 bg-slate-100 flex items-center justify-center p-6'>
      <div className='bg-slate-50 p-8 rounded-2xl shadow-md w-full max-w-md'>
        <h1 className='text-center font-semibold text-slate-400 text-2xl'>Reset Password</h1>
        <form className='flex flex-col gap-5 pt-10' onSubmit={handleSubmit}>
          <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" className='border border-slate-400 px-4 py-2.5 rounded-md ' placeholder='password' />
          <button type='submit' className='px-4 py-3 rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer text-white'>Reset Password</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword