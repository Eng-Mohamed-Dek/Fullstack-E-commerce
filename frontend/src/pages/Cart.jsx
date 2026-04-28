import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Cart = () => {
  const { all_products, cart, removeProduct, totalMoney } = useContext(AppContext)

  return (
    <div className="mx-[300px] my-[50px]">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-[75px] px-0 py-[20px] font-semibold text-[18px] sm:text-[15px] sm:gap-[20px] sm:px-[15px] sm:py-0 bg-slate-600 h-10 items-center text-white mb-3">
        <p>Products</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      {all_products.map((product) => {
        if (cart[product.id] > 0) {
          return (<div key={product.id}>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-[75px] px-0 py-[20px] text-slate-700 font-medium text-[17px] sm:gap-[20px] sm:px-[15px] sm:py-0 items-center">
              <img src={product.image} alt="" className="h-[80px]" />
              <p>${product.price}</p>
              <button className="w-[64px] h-[50px] bg-white text-[20px]">
                {cart[product.id]}
              </button>
              <p>${product.price * cart[product.id]}</p>
              <img
                src="./cart_cross_icon.png"
                alt=""
                className="w-[15px] mx-[40px] cursor-pointer"
                onClick={() => removeProduct(product.id)}
              />
            </div>
            <hr className="bg-slate-200 h=[2px]" />
          </div>)
        }
      })}

      <div className="flex justify-center mt-16 px-4 py-">
        <div className="w-full max-w-md bg-slate-100 rounded-md p-6 space-y-6">
          <h2 className="text-xl font-bold text-slate-800">Cart Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${totalMoney}</span>
            </div>
            <hr className="border-slate-300" />
            <div className="flex justify-between font-semibold text-slate-700">
              <span>Total</span>
              <span>${totalMoney}</span>
            </div>
          </div>

          <button className="cursor-pointer w-full bg-slate-600 text-white py-3 font-semibold hover:bg-slate-800 transition">
            Proceed to Checkout
          </button>
        </div>
        </div>
      </div>
      )
}

      export default Cart