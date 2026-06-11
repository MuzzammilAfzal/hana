"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    const res = await fetch("/api/enquiry", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});

const data = await res.json();

if (data.success) {
  toast.success(data.message);

  setFormData({
    name: "",
    phone: "",
    message: "",
  });
} else {
  toast.error(data.message);
}

    setFormData({
      name: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section id="enquiry-form" className="flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Enquiry Form
        </h2>

        <p className="mb-6 text-center text-gray-600">
          Have a question or need more information? Fill out the form below and
          we'll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              placeholder="Type your enquiry here..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-red-500"
            />
          </div>

          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            📞 <strong>Note:</strong> Our team will contact you within{" "}
            <strong>6 hours</strong> after receiving your enquiry.
          </p>

          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 py-3 text-lg font-semibold text-white transition hover:bg-red-700"
          >
            Submit Enquiry
          </button>
        </form>
        <br />
        <div className="">
            <a href="tel:+917760576768" className="mt-6 flex flex-wrap items-center justify-center gap-6 text-center  text-gray-700 hover:text-red-600 transition">
                   <span className='text-4xl'>or click here to call us directly</span>
                    <span className='text-4xl'>📞</span>
                    <span className='text-black text-lg'>+91 7760576768</span>
                </a>
        </div>
      </div>

    </section>
  );
}