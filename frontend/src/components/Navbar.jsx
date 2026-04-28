import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { ShoppingCart } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
    const { cartTotal } = useContext(AppContext);
    const navigate = useNavigate();

    const user = localStorage.getItem('token')

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // redirect after logout
    };

    return (
        <header className="bg-white">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link to="/">
                    <img src="./logo.png" alt="Logo" className="h-10 cursor-pointer" />
                </Link>

                {/* Navigation Links */}
                <nav>
                    <ul className="flex space-x-8">
                        <li>
                            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium">
                                Products
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-5">
                    <span className="h-8 w-8 rounded-full bg-blue-500/80 flex justify-center items-center text-white">
                        {cartTotal}
                    </span>

                    <Link to="/cart">
                        <ShoppingCart size={30} className="text-blue-500 cursor-pointer" />
                    </Link>

                    {!user && (
                        <Link to="/signup">
                            <Button text="Register Now" />
                        </Link>
                    )}

                    {user &&  <button className="text-white cursor-pointer bg-blue-500 px-5 py-2.5 rounded-md" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </header>
    );
};

export default Navbar;