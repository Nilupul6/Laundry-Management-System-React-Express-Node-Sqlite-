// 


// src/pages/MainPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // No Link needed here directly for sidebar
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import sidebar from './assets/react.svg'; // This import seems unused, you can remove it if not used elsewhere

// Import the new Sidebar component
import Sidebar from "../components/sidebar"; // Adjust path if your Sidebar is elsewhere

// Remove lucide-react icons from here, they are now in Sidebar
// import { Menu, X, Shirt, Truck, DollarSign, ClipboardList, LogOut } from "lucide-react";

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  // State to control the visibility of the "Add Order" form
  const [showAddOrderForm, setShowAddOrderForm] = useState(false);

  // State for the Add Order Form inputs
  const [form, setForm] = useState({
    billNo: "",
    customerName: "",
    teleNo: "",
    address: "",
  });
  // State for the date picker (using react-calendar)
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to handle input changes for the form fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar Component */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="container flex flex-col min-h-screen bg-gray-100 flex-1">
        {" "}
        {/* Added flex-1 here to ensure main content takes remaining width */}
        <header className="w-full bg-stone-50 py-4 px-6 flex items-center justify-left">
          <div className="text-black text-lg font-semibold">Dashboard</div>
        </header>
        <div className="flex flex-1">
          <main className="flex-1 bg-blue-100 p-3 flex flex-col items-center justify-center">
            <div className="text-black text-lg font-semibold mb-4">
              Add Order
            </div>{" "}
            {/* Moved this heading for better layout */}
            {!showAddOrderForm ? (
              // Plus button
              <div className="bg-white rounded-lg shadow-md p-4 flex justify-center items-center h-full w-full max-w-lg">
                <button
                  onClick={() => setShowAddOrderForm(true)}
                  className="w-24 h-24 border-2 border-dashed border-blue-600 rounded-lg flex items-center justify-center text-blue-600 hover:bg-gray-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              // Add Order Form
              <div className="flex-1 bg-gray-200 p-8 flex justify-center items-start min-h-full w-full">
                <div className="bg-white shadow-lg rounded-xl p-8 max-w-5xl w-full relative">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Add Order Form
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <label className="block mb-1 text-gray-700 text-sm font-medium">
                        Bill No :
                      </label>
                      <input
                        type="text"
                        name="billNo"
                        value={form.billNo}
                        onChange={handleInput}
                        placeholder="Value"
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
                      />
                    </div>
                    <div className="relative">
                      <label className="block mb-1 text-gray-700 text-sm font-medium">
                        Date
                      </label>
                      <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        className="mt-1 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-gray-700 text-sm font-medium">
                        Customer Name :
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        value={form.customerName}
                        onChange={handleInput}
                        placeholder="Value"
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-gray-700 text-sm font-medium">
                        Tele.No
                      </label>
                      <input
                        type="text"
                        name="teleNo"
                        value={form.teleNo}
                        onChange={handleInput}
                        placeholder="Value"
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block mb-1 text-gray-700 text-sm font-medium">
                      Address:
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleInput}
                        placeholder="Value"
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
                    />
                  </div>

                  <button
                    className="mt-8 bg-purple-700 hover:bg-purple-800 text-white py-3 w-full rounded-md font-semibold transition-all flex items-center justify-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Select Items / Services</span>
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}