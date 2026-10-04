import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import ErrorPage from './components/ErrorPage'
import Home from './pages/Home'
import Shop from './pages/Shop'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Login from './pages/Login'
import Contact from './pages/Contact'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App