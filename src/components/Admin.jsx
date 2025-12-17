// src/pages/Admin.jsx
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, price: Number(price), image };
    await fetch("https://ecommerce-backend-zpvu.onrender.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    // after adding, go to products so new product appears (or you can stay here)
    navigate("/products");
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Admin - Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 border rounded mt-1" />
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-amber-900 text-white rounded">Add Product</button>
        </div>
      </form>
    </div>
  );
}