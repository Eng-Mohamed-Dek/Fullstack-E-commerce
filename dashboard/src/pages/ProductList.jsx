import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {

  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    productAvalibitiy: true
  });
  const [image, setImage] = useState(null);

  const API = import.meta.env.VITE_BACKEND_URL;

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/get-products`);
    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;

    await axios.delete(`${API}/delete/${id}`);
    fetchProducts();
  };

  const startEdit = (product) => {
    setEditing(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      productAvalibitiy: product.productAvalibitiy
    });
  };

  const updateProduct = async () => {

    console.log(form)
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("productAvalibitiy", form.productAvalibitiy ?? true);

    if (image) {
      formData.append("image", image);
    }

    // Debug FormData correctly
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    console.log(formData.name)
    await axios.put(`${API}/update/${editing}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    setEditing(null);
    setImage(null);
    fetchProducts();
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="overflow-x-auto">

        <table className="w-full border border-slate-300">

          <thead className="bg-slate-600 text-white font-normal">
            <tr>
              <th className="p-1 border">Name</th>
              <th className="p-1 border">Description</th>
              <th className="p-1 border">Price</th>
              <th className="p-1 border">Actions</th>
            </tr>
          </thead>

          <tbody>

            {products.map((p) => (

              <tr key={p._id}>

                <td className="border border-slate-300 p-2">
                  {editing === p._id ? (
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="border border-slate-300 p-1 w-full"
                    />
                  ) : (
                    p.name
                  )}

                </td>

                <td className="border border-slate-300 p-2">

                  {editing === p._id ? (
                    <input
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="border p-1 w-full"
                    />
                  ) : (
                    p.description
                  )}

                </td>

                <td className="border border-slate-300 p-2">

                  {editing === p._id ? (
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="border border-slate-300 p-1 w-full"
                    />
                  ) : (
                    `$${p.price}`
                  )}

                </td>

                <td className="border border-slate-300 p-2">

                  {editing === p._id ? (
                    <div className="flex flex-col gap-2">

                      <div className="flex">
                        <input
                          type="file"
                          onChange={(e) => setImage(e.target.files[0])}
                        />

                        <select
                          value={form.productAvalibitiy}
                          onChange={(e) =>
                            setForm({ ...form, productAvalibitiy: e.target.value === "true" })
                          }
                        >
                          <option value="true">Available</option>
                          <option value="false">Not Available</option>
                        </select>
                      </div>
                      <button
                        onClick={updateProduct}
                        className="cursor-pointer bg-blue-500 text-white py-1 rounded"
                      >
                        Save
                      </button>

                    </div>
                  ) : (

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => startEdit(p)}
                        className="cursor-pointer  bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}