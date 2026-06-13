"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function OrderForm() {
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    shopName: "",
    address: "",
    order: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Order submitted successfully!");

      setFormData({
        name: "",
        phone: "",
        shopName: "",
        address: "",
        order: "",
      });
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to submit order");
  }finally {
    setLoading(false);
  }
 };

  return (
    <section id="order-form"
  className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    {loading && <Loader />}
    <div className="min-h-screen  w-full max-w-xl flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">
          Order Form
        </h2>

        <div>
          <label className="block mb-1 font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Shop Name / Flat Number
          </label>
          <input
            type="text"
            name="shopName"
            placeholder="Enter shop name or flat number"
            value={formData.shopName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
           Shop Address / Flat Address
          </label>
          <textarea
            name="address"
            rows={3}
            placeholder="Enter shop address or flat address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Order
          </label>
          <textarea
            name="order"
            rows={5}
            placeholder="Enter your order details..."
            value={formData.order}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Order
        </button>
      </form>
    </div>
    </section>
  );
}