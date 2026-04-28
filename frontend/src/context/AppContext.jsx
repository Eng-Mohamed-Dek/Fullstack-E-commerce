import { useEffect } from 'react';
import { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios'

// 1- create context 
export const AppContext = createContext(null)

// cart default value 
const defaultData = () => {
    let cart = {};
    for (let index = 0; index < 300; index++) {
        cart[index] = 0;
    }

    return cart;
}

const AppContextProvider = ({ children }) => {
    // all functions 
    const [cart, setCartItems] = useState(defaultData());
    const [all_products, setProducts] = useState([]);

    const API = import.meta.env.VITE_BACKEND_URL;

    const token = localStorage.getItem('token');

    const getProducts = async () => {
        try {
            const response = await axios.get(`${API}/get-products`)
            setProducts(response.data?.products)

            // get cart items 
            if (token) {
                const response = await axios.get(`${API}/cart/getCart`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setCartItems(response.data.carts)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error to fetch products")
        }

    }


    useEffect(() => {
        getProducts()
    }, [])

    // add product  
    const AddProduct = async (id) => {
        setCartItems((prevItem) => (
            {
                ...prevItem,
                [id]: prevItem[id] + 1
            }
        ))

        if (!token) {
            toast.error("Login to add to the cart")
        }

        if (!token) return

        try {
            const response = await axios.post(`${API}/cart/addCart`, { id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(response.data.message || "Product Added Successfully")

        } catch (error) {
            toast.error(error.response?.data?.message || "Error to adding to cart")
        }
    }

    // remove product 
    const removeProduct = async (id) => {
        setCartItems((prevItem) => (
            {
                ...prevItem,
                [id]: prevItem[id] - 1
            }
        ))

        try {
            console.log(token)
            const response = await axios.post(`${API}/cart/removeCart`, { id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(response.data.message || "Product Removed Successfully")

        } catch (error) {
            toast.error(error.response?.data?.message || "Error to removing cart")
        }
    }

    // total products added to cart 
    const totalCart = () => {
        let total = 0;
        for (const item in cart) {
            if (cart[item] > 0) {
                total += cart[item]
            }
        }

        return total;
    }

    const Total_Money = () => {
        let totalMoney = 0;
        for (const item in cart) {
            if (cart[item] > 0) {
                const product = all_products.find(product => product.id === Number(item))
                totalMoney += product?.price * cart[item]
            }
        }

        return totalMoney;
    }

    const cartTotal = totalCart()
    const totalMoney = Total_Money()

    return <AppContext.Provider value={{ cart, setCartItems, all_products, AddProduct, removeProduct, cartTotal, totalMoney }}>{children}</AppContext.Provider>

}

export default AppContextProvider;

// AppContextProvider > children(app)