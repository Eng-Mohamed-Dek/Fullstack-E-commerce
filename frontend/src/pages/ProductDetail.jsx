import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const ProductDetail = () => {
  const { name } = useParams()
  const { all_products } = useContext(AppContext)

  const current_product = all_products.find((product) => product.name == name)

  return (
      <div className="md:px-96 bg-slate-100 flex flex-col md:flex-row gap-5 items-center">
        <div>
          <img className="h-[330px] sm:h-[200px] md:h-[410px] xl:h-[500px] rounded mx-auto" src={current_product.image} alt="" />
        </div>
        <div className="w-[90%] md:max-w-lg flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">{current_product.name}</h2>
          <p className="text-3xl font-semibold">${current_product.price}</p>
          <p className="text-base text-gray-600">{current_product.description}</p>
          <p className="font-medium text-lg">
            <span className="font-normal">Color:</span> {current_product.color}
          </p>
          <button
            className="cursor-pointer w-full py-3 bg-slate-700 hover:bg-slate-800 duration-300 text-white text-lg font-titleFont"
          > Add to Cart </button>
        </div>
      </div>
  )
}

export default ProductDetail