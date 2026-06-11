"use client";

// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";



export default  function Dashboard() {


  const [loading, setLoading] = useState(false);
  // const cookieStore = await cookies();

  // const token = cookieStore.get("token")?.value;

  // if (!token) {
  //   redirect("/admin/login");
  // }

  // try {
  //   jwt.verify(token, process.env.JWT_SECRET);
  // } catch (error) {
  //   redirect("/admin/login");
  // }

  const fetchOrders = async (filter = "all") => {
    setLoading(true);
    try {
      let url = "/api/orders";

    if (filter === "completed") {
      url += "?completed=true";
    } else if (filter === "pending") {
      url += "?completed=false";
    }

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      setFilteredOrders(data.orders);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


const fetchEnquiries = async (filter = "all") => {
  setLoading(true);
  try {
    let url = "/api/enquiry";

    if (filter === "checked") {
      url += "?checked=true";
    } else if (filter === "unchecked") {
      url += "?checked=false";
    }

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      setFilteredEnquiries(data.enquiries);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};



const toggleOrder = async (id) => {
  setLoading(true);
  try {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Order status updated");
      await fetchOrders(orderFilter);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


const toggleEnquiry = async (id) => {
  setLoading(true);
  try {
    const res = await fetch(`/api/enquiry/${id}`, {
      method: "PATCH",
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Enquiry status updated");
      await fetchEnquiries(enquiryFilter);
    }
  } catch (error) {
    console.log(error);
  }finally {
    setLoading(false);
  }
};





  const [activeTab, setActiveTab] = useState("orders");

const [orderFilter, setOrderFilter] = useState("all");

const [enquiryFilter, setEnquiryFilter] = useState("all");

const [filteredOrders, setFilteredOrders] = useState([]);

const [filteredEnquiries, setFilteredEnquiries] = useState([]);

useEffect(() => {
  fetchOrders();
  fetchEnquiries();
}, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {loading && <Loader />}
      <h1 className="mb-8 text-center text-4xl font-bold">
        Admin Dashboard
      </h1>

      {/* Top Buttons */}
      <div className="mb-8 flex justify-center gap-4">
        <button
          onClick={() => setActiveTab("orders")}
          className={`rounded-lg px-6 py-3  font-semibold ${
            activeTab === "orders"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Orders
        </button>

        <button
          onClick={() => setActiveTab("enquiries")}
          className={`rounded-lg px-6 py-3  font-semibold ${
            activeTab === "enquiries"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Enquiries
        </button>
      </div>

      {/* Orders Section */}
      {activeTab === "orders" && (
        <>
          <div className="mb-6 flex justify-center">
            <select
              value={orderFilter}
             onChange={(e) => {
                      setOrderFilter(e.target.value);
                      fetchOrders(e.target.value);
                     }}
              className="rounded-lg border px-4 py-2"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="grid gap-5">
            {filteredOrders.map((item) => (
              <div
                key={item._id}
                className="rounded-xl bg-white p-5 shadow"
              >
                <h2 className="text-xl font-bold">{item.name}</h2>

                <p>
                  <strong>Phone:</strong> {item.phone}
                </p>

                <p>
                  <strong>Shop:</strong> {item.shopName}
                </p>

                <p>
                  <strong>Address:</strong> {item.address}
                </p>

                <p>
                  <strong>Order:</strong> {item.order}
                </p>

                <p className="mt-2">
                  <strong>Status:</strong>{" "}
                  {item.completed ? (
                    <span className="text-green-600">
                      Completed
                    </span>
                  ) : (
                    <span className="text-red-600">
                      Pending
                    </span>
                  )}
                </p>

               <button
                 onClick={() => toggleOrder(item._id)}
                 className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
               >
                 {item.completed ? "Mark Pending" : "Mark Completed"}
               </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Enquiries Section */}
      {activeTab === "enquiries" && (
        <>
          <div className="mb-6 flex justify-center">
            <select
              value={enquiryFilter}
              onChange={(e) => {
                   setEnquiryFilter(e.target.value);
                   fetchEnquiries(e.target.value);
                   }}
              className="rounded-lg border px-4 py-2"
            >
              <option value="all">All Enquiries</option>
              <option value="unchecked">Unchecked</option>
              <option value="checked">Checked</option>
            </select>
          </div>

          <div className="grid gap-5">
            {filteredEnquiries.map((item) => (
              <div
                key={item._id}
                className="rounded-xl bg-white p-5 shadow"
              >
                <h2 className="text-xl font-bold">{item.name}</h2>

                <p>
                  <strong>Phone:</strong> {item.phone}
                </p>

                <p>
                  <strong>Message:</strong> {item.message}
                </p>

                <p className="mt-2">
                  <strong>Status:</strong>{" "}
                  {item.checked ? (
                    <span className="text-green-600">
                      Checked
                    </span>
                  ) : (
                    <span className="text-red-600">
                      Unchecked
                    </span>
                  )}
                </p>

                <button
                 onClick={() => toggleEnquiry(item._id)}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
                 >
                   {item.checked ? "Mark Unchecked" : "Mark Checked"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}