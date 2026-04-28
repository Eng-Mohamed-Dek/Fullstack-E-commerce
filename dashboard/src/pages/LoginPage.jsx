import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function loginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      const url = import.meta.env.VITE_BACKEND_URL;

      const res = await axios.post(`${url}/admin-login`, formData)
      localStorage.setItem("token", res.data.token)
      toast.success(res.data.message)
      navigate('/dashboard')


    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Login failed');
    }

  };

  return (
    <div className="py-20  h-screen mx-auto flex items-center justify-center p-6">
      <div className="p-8 rounded-2xl shadow-md w-full max-w-md">
        <Link to="/admin">
          <img src="./logo.png" className="cursor-pointer w-56 flex ml-20 mb-10" />
        </Link>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-700 font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-1" htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700 focus:outline-none"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-slate-700 text-white font-semibold py-3 rounded-md hover:bg-slate-800 transition"
          >
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
}
