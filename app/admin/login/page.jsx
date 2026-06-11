"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function AdminLogin() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    adminId: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminId: formData.adminId,
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (data.success) {

      toast.success(data.message || "Login Successful");

     router.push("/admin/dashboard");
  
    } else {
      toast.error(data.message || "Invalid Credentials");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};

  return (
    <div className="flex min-h-screen  justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Admin Login
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Sign in to access the admin dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Admin ID */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Admin ID
            </label>

            <input
              type="text"
              name="adminId"
              placeholder="Enter Admin ID"
              value={formData.adminId}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-blue-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-14 text-black outline-none focus:border-blue-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}