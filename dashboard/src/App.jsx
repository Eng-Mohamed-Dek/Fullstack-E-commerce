import React, { use } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import ProductList from './pages/ProductList'
import AddProduct from './pages/AddProduct'
import Layout from './components/Layout'
import ProtectRoute from './components/ProtectRoute'
import AdminNotFound from './components/AdminNotFound'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        {/* 4 pages > 1 page for free * login > 3 pages must be visited by admin  */}
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectRoute />}>
          <Route path='/' element={<Layout />}>
            <Route index path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/products" element={<ProductList />} />
          </Route>
        </Route>
        <Route path="*" element={<AdminNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
