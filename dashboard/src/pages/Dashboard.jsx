import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Users, PackageCheck, Package, ShoppingCart } from "lucide-react"; // icons

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch all products
        const productRes = await axios.get(`${API}/get-products`);
        setProducts(productRes.data.products);

        // fetch all users
        const userRes = await axios.get(`${API}/auth/users`); // assume you have an admin route
        setUsers(userRes.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // stats
  const totalProducts = products.length;
  const inStock = products.filter(p => p.productAvalibitiy).length;
  const outOfStock = products.filter(p => !p.productAvalibitiy).length;
  const totalUsers = users.length;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {/* Total Products */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <Package className="w-12 h-12 text-blue-500" />
          <div>
            <h2 className="text-gray-500">Total Products</h2>
            <p className="text-2xl font-bold">{totalProducts}</p>
          </div>
        </div>

        {/* In Stock */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <PackageCheck className="w-12 h-12 text-green-500" />
          <div>
            <h2 className="text-gray-500">In Stock</h2>
            <p className="text-2xl font-bold">{inStock}</p>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <Box className="w-12 h-12 text-red-500" />
          <div>
            <h2 className="text-gray-500">Out of Stock</h2>
            <p className="text-2xl font-bold">{outOfStock}</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <Users className="w-12 h-12 text-purple-500" />
          <div>
            <h2 className="text-gray-500">Total Users</h2>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
        </div>

      </div>

      {/* Users Cart Summary */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Users & Their Cart Items</h2>
        <table className="w-full table-auto border border-slate-500 border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-2 border border-slate-500">User</th>
              <th className="p-2 border border-slate-500">Email</th>
              <th className="p-2 border border-slate-500">Cart Items</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              const cartItems = Object.values(user.cartData || {}).reduce((sum, qty) => sum + qty, 0);
              return (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-2 border border-slate-500">{user.name}</td>
                  <td className="p-2 border border-slate-500">{user.email}</td>
                  <td className="p-2 border border-slate-500 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-blue-500" /> {cartItems}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;