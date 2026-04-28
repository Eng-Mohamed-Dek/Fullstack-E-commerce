import { useState } from "react"
import toast from 'react-hot-toast'
import axios from 'axios'

const AddProduct = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    productAvalibitiy: true,
  })

  const [loading, setLoadng] = useState(false)

  const handleData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("productAvalibitiy", data.productAvalibitiy)
    formData.append("image", data.image)

    try {
      setLoadng(true)
      const API = import.meta.env.VITE_BACKEND_URL;
      await axios.post(`${API}/create-product`, formData)
      toast.success("Created Successfully")
      setLoadng(false)

      setData({
        name: "",
        description: "",
        image: null,
        price: "",
      })
    } catch (error) {
      setLoadng(false)
      toast.error(error.response.data.message || "Error to create product")
    }
  }


  return (
    <div className='w-full md:max-w-3xl m-10 rounded-md'>

      <div className='m-10'>
        <h1 className='mb-5 text-3xl font-semibold text-center'>Add Products</h1>
        <form onSubmit={handleSubmit} className='bg-white flex flex-col gap-5 p-10 rounded-md'>
          <input className='w-full py-3 px-4 border border-slate-400 rounded' type='text' name='name' placeholder='Enter Product Name' value={data.name} onChange={handleData} />
          <input className='w-full py-3 px-4 border border-slate-400 rounded' type='text' name='description' placeholder='Enter Product Description' value={data.description} onChange={handleData} />
          <input className='w-full py-3 px-4 border border-slate-400 rounded' type='number' name='price' placeholder='Enter Product Price' value={data.price} onChange={handleData} />
          <input className='w-full py-3 px-4 border border-slate-400 rounded' type='file' name='image' onChange={(e) => setData({ ...data, image: e.target.files[0] })} />

          <div className='flex gap-5'>
            <input type="checkbox" name="productAvalibitiy" value={data.productAvalibitiy} checked={data.productAvalibitiy} onChange={(e) => setData({ ...data, productAvalibitiy: e.target.checked })} />
          </div>
          <button className='w-full py-3 px-4 bg-slate-500 text-white cursor-pointer rounded' >{loading ? "Adding Product..." : "Add Product" }</button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct