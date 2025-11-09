// // // src/pages/MainPage.jsx
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { X } from "lucide-react"; // Import X icon for the close button

// // // Import the Sidebar component
// // import Sidebar from "../components/sidebar";

// // export default function MainPage() {
// //   const [isOpen, setIsOpen] = useState(true);
// //   const navigate = useNavigate();
// //   const [showPopup, setShowPopup] = useState(false); // State for the new popup message

// //   const handleLogout = () => {
// //     localStorage.removeItem("authToken");
// //     navigate("/");
// //   };

// //   return (
// //     <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
// //       {/* Sidebar Component */}
// //       <Sidebar
// //         isOpen={isOpen}
// //         setIsOpen={setIsOpen}
// //         handleLogout={handleLogout}
// //       />

// //       {/* Main Content - Adjusted for fixed sidebar */}
// //       <div
// //         className={`flex flex-col min-h-screen bg-gray-100 flex-1 transition-all duration-300 ${
// //           isOpen ? "ml-64" : "ml-20" // Dynamically adjust left margin
// //         }`}
// //       >
// //         <header className="w-full bg-stone-50 py-4 px-6 flex items-center justify-start shadow-md">
// //           <div className="text-black text-xl font-semibold">Dashboard Overview</div>
// //         </header>

// //         <div className="flex flex-1 p-6">
// //           <main className="flex-1 bg-white rounded-xl shadow-lg p-6 flex flex-col">
// //             <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Your Laundry Dashboard!</h2>

// //             {/* Dashboard Cards/Sections */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
// //               {/* Card 1: Quick Add Order */}
// //               <div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
// //                 <h3 className="text-lg font-semibold text-blue-800 mb-4">New Order</h3>
// //                 <button
// //                   onClick={() => {
// //                   setShowPopup(false);
// //                   navigate('/Order'); // Navigate to the Order page
// //                 }}
// //                   className="w-24 h-24 border-2 border-dashed border-blue-600 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
// //                   aria-label="Add New Order"
// //                 >
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     className="h-10 w-10"
// //                     fill="none"
// //                     viewBox="0 0 24 24"
// //                     stroke="currentColor"
// //                     strokeWidth="2"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       d="M12 4v16m8-8H4"
// //                     />
// //                   </svg>
// //                 </button>
// //                 <p className="mt-3 text-gray-600">Click to add a new laundry order.</p>
// //               </div>

// //               {/* Card 2: Orders Summary (Example) */}
// //               <div className="bg-green-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
// //                 <h3 className="text-lg font-semibold text-green-800 mb-4">Active Orders</h3>
// //                 <p className="text-4xl font-bold text-green-700">15</p>
// //                 <p className="text-gray-600 mt-2">Orders currently in progress.</p>
// //                 <button
// //                   onClick={() => navigate('/Order')} // Link to the Orders page
// //                   className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
// //                 >
// //                   View All Orders
// //                 </button>
// //               </div>

// //               {/* Card 3: Recent Deliveries (Example) */}
// //               <div className="bg-purple-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
// //                 <h3 className="text-lg font-semibold text-purple-800 mb-4">Upcoming Deliveries</h3>
// //                 <p className="text-4xl font-bold text-purple-700">7</p>
// //                 <p className="text-gray-600 mt-2">Orders scheduled for delivery today/tomorrow.</p>
// //                 <button
// //                   onClick={() => navigate('/OrderDelivery')} // Link to the Delivery page
// //                   className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
// //                 >
// //                   Manage Deliveries
// //                 </button>
// //               </div>
// //             </div>

// //             {/* You can add more dashboard sections here, e.g., charts, recent activity, etc. */}
// //             <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
// //                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <p className="text-gray-700">Revenue Today: <span className="font-bold text-green-600">Rs. 15,000.00</span></p>
// //                     <p className="text-gray-700">New Customers This Week: <span className="font-bold text-blue-600">5</span></p>
// //                     <p className="text-gray-700">Items Processed: <span className="font-bold text-purple-600">320</span></p>
// //                     <p className="text-gray-700">Pending Payments: <span className="font-bold text-red-600">Rs. 2,500.00</span></p>
// //                 </div>
// //             </div>

// //           </main>
// //         </div>
// //       </div>


// //     </div>
// //   );
// // }

// // src/pages/MainPage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { X, LogOut, Menu, Home, ShoppingCart, Truck } from "lucide-react"; // Import icons

// // Define your backend's URL
// const API_URL = "http://localhost:8080/api";

// // --- PLACEHOLDER SIDEBAR COMPONENT ---
// // This component is added here to resolve the import error.
// // In a real app, this would be in its own file.
// const Sidebar = ({ isOpen, setIsOpen, handleLogout }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       className={`fixed top-0 left-0 h-full bg-blue-800 text-white transition-all duration-300 ${
//         isOpen ? "w-64" : "w-20"
//       } shadow-lg z-50`}
//     >
//       <div className="flex flex-col h-full">
//         {/* Header with Toggle Button */}
//         <div className="flex items-center justify-between p-4 h-16 border-b border-blue-700">
//           <h1
//             className={`text-xl font-bold transition-opacity ${
//               isOpen ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             Laundry
//           </h1>
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="p-2 rounded-lg hover:bg-blue-700"
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex-1 py-4 space-y-2">
//           <a
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               navigate("/dashboard");
//             }}
//             className="flex items-center p-4 hover:bg-blue-700"
//           >
//             <Home size={24} />
//             <span
//               className={`ml-4 transition-opacity ${
//                 isOpen ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               Dashboard
//             </span>
//           </a>
//           <a
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               navigate("/Order");
//             }}
//             className="flex items-center p-4 hover:bg-blue-700"
//           >
//             <ShoppingCart size={24} />
//             <span
//               className={`ml-4 transition-opacity ${
//                 isOpen ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               Orders
//             </span>
//           </a>
//           <a
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               navigate("/OrderDelivery");
//             }}
//             className="flex items-center p-4 hover:bg-blue-700"
//           >
//             <Truck size={24} />
//             <span
//               className={`ml-4 transition-opacity ${
//                 isOpen ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               Deliveries
//             </span>
//           </a>
//         </nav>

//         {/* Logout Button */}
//         <div className="p-4 border-t border-blue-700">
//           <button
//             onClick={handleLogout}
//             className="flex items-center w-full p-4 rounded-lg hover:bg-blue-700"
//           >
//             <LogOut size={24} />
//             <span
//               className={`ml-4 transition-opacity ${
//                 isOpen ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               Logout
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// // --- END OF SIDEBAR COMPONENT ---

// export default function MainPage() {
//   const [isOpen, setIsOpen] = useState(true);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     activeOrders: 0,
//     upcomingDeliveries: 0,
//     revenueToday: "0.00",
//     pendingPayments: "0.00",
//   });

//   // --- 1. FIXED LOGOUT ---
//   // This now calls your backend to destroy the session cookie
//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         `${API_URL}/auth/logout`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//     } catch (err) {
//       // Log error but log out anyway
//       console.error("Error logging out:", err);
//     } finally {
//       // Always navigate to login page
//       navigate("/");
//     }
//   };

//   // --- 2. FETCH DASHBOARD DATA ON LOAD ---
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Fetch all orders from the new backend route
//         const res = await axios.get(`${API_URL}/orders`, {
//           withCredentials: true, // CRITICAL for sessions
//         });

//         const orders = res.data; // This is now an array of all orders

//         // --- Calculate Stats ---
//         const activeOrders = orders.length;

//         // (SIMULATED) Your DB doesn't track "upcoming" vs "all"
//         // We'll just filter by delivery time as an example
//         const upcomingDeliveries = orders.filter(
//           (o) =>
//             o.DeliveryTime === "Express" || o.DeliveryTime === "AfterOneDay"
//         ).length;

//         // (SIMULATED) Your DB schema doesn't have total price or payment status
//         // so we can't calculate this from the DB. We will hardcode for now.
//         const revenueToday = "15,000.00";
//         const pendingPayments = "2,500.00";

//         setStats({
//           activeOrders,
//           upcomingDeliveries,
//           revenueToday,
//           pendingPayments,
//         });
//       } catch (err) {
//         // If session expired or user is not logged in, redirect to login
//         if (err.response && err.response.status === 401) {
//           alert("Your session has expired. Please log in again.");
//           navigate("/");
//         } else {
//           console.error("Error fetching dashboard data:", err);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [navigate]); // Add navigate to dependency array

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
//       {/* Sidebar Component */}
//       <Sidebar
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         handleLogout={handleLogout}
//       />

//       {/* Main Content - Adjusted for fixed sidebar */}
//       <div
//         className={`flex flex-col min-h-screen bg-gray-100 flex-1 transition-all duration-300 ${
//           isOpen ? "ml-64" : "ml-20" // Dynamically adjust left margin
//         }`}
//       >
//         <header className="w-full bg-stone-50 py-4 px-6 flex items-center justify-start shadow-md">
//           <div className="text-black text-xl font-semibold">
//             Dashboard Overview
//           </div>
//         </header>

//         <div className="flex flex-1 p-6">
//           <main className="flex-1 bg-white rounded-xl shadow-lg p-6 flex flex-col">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">
//               Welcome to Your Laundry Dashboard!
//             </h2>

//             {/* Dashboard Cards/Sections */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//               {/* Card 1: Quick Add Order */}
//               <div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
//                 <h3 className="text-lg font-semibold text-blue-800 mb-4">
//                   New Order
//                 </h3>
//                 <button
//                   onClick={() => {
//                     navigate("/Order"); // Navigate to the Order page
//                   }}
//                   className="w-24 h-24 border-2 border-dashed border-blue-600 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
//                   aria-label="Add New Order"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-10 w-10"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M12 4v16m8-8H4"
//                     />
//                   </svg>
//                 </button>
//                 <p className="mt-3 text-gray-600">
//                   Click to add a new laundry order.
//                 </p>
//               </div>

//               {/* Card 2: Orders Summary (Connected) */}
//               <div className="bg-green-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
//                 <h3 className="text-lg font-semibold text-green-800 mb-4">
//                   Active Orders
//                 </h3>
//                 <p className="text-4xl font-bold text-green-700">
//                   {loading ? "..." : stats.activeOrders}
//                 </p>
//                 <p className="text-gray-600 mt-2">
//                   Total orders in the system.
//                 </p>
//                 <button
//                   onClick={() => navigate("/Order")} // Link to the Orders page
//                   className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
//                 >
//                   View All Orders
//                 </button>
//               </div>

//               {/* Card 3: Recent Deliveries (Connected) */}
//               <div className="bg-purple-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
//                 <h3 className="text-lg font-semibold text-purple-800 mb-4">
//                   Upcoming Deliveries
//                 </h3>
//                 <p className="text-4xl font-bold text-purple-700">
//                   {loading ? "..." : stats.upcomingDeliveries}
//                 </p>
//                 <p className="text-gray-600 mt-2">
//                   (e.g., Express or 1-Day)
//                 </p>
//                 <button
//                   onClick={() => navigate("/OrderDelivery")} // Link to the Delivery page
//                   className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
//                 >
//                   Manage Deliveries
//                 </button>
//               </div>
//             </div>

//             {/* Quick Stats (Partially Connected) */}
//             <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Quick Stats
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <p className="text-gray-700">
//                   Revenue Today:{" "}
//                   <span className="font-bold text-green-600">
//                     Rs. {loading ? "..." : stats.revenueToday} (Simulated)
//                   </span>
//                 </p>
//                 <p className="text-gray-700">
//                   New Customers This Week:{" "}
//                   <span className="font-bold text-blue-600">
//                     {loading ? "..." : "N/A"}
//                   </span>
//                 </p>
//                 <p className="text-gray-700">
//                   Items Processed:{" "}
//                   <span className="font-bold text-purple-600">
//                     {loading ? "..." : "N/A"}
//                   </span>
//                 </p>
//                 <p className="text-gray-700">
//                   Pending Payments:{" "}
//                   <span className="font-bold text-red-600">
//                     Rs. {loading ? "..." : stats.pendingPayments} (Simulated)
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }



// src/pages/MainPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  X,
  LogOut,
  Menu,
  Home,
  ShoppingCart,
  Truck,
  LayoutDashboard, // Added for Sidebar
  Shirt, // Added for Sidebar
  ClipboardList, // Added for Sidebar
} from "lucide-react"; // Import icons

// Define your backend's URL
const API_URL = "http://localhost:8080/api";

// --- SIDEBAR COMPONENT IS NOW EMBEDDED ---
// This is the correct 5-link version from your history
const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation(); // To highlight active sidebar link
  const navigate = useNavigate(); // To redirect on logout

  // --- CONNECTED LOGOUT ---
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await axios.post(
          `${API_URL}/auth/logout`,
          {},
          { withCredentials: true }
        );
      } catch (err) {
        console.error("Error logging out:", err);
      } finally {
        navigate("/"); // Always navigate to login page
      }
    }
  };
  // --- END CONNECTED LOGOUT ---

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 ${
        isOpen ? "w-64" : "w-20"
      } bg-blue-700 text-white transition-all duration-300 shadow-lg flex flex-col justify-between z-50`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-500">
          <h1
            className={`text-xl font-bold tracking-wide transition-all duration-300 ${
              !isOpen && "hidden"
            }`}
          >
            Gamma Laundry
          </h1>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/Dashboard"
                className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                  location.pathname === "/Dashboard"
                    ? "bg-blue-800 rounded-r-full"
                    : "hover:bg-blue-600"
                }`}
              >
                <LayoutDashboard size={20} />
                {isOpen && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/ItemRegistration"
                className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                  location.pathname === "/ItemRegistration"
                    ? "bg-blue-800 rounded-r-full"
                    : "hover:bg-blue-600"
                }`}
              >
                <Shirt size={20} />
                {isOpen && <span>Add Items </span>}
              </Link>
            </li>
            <li>
              <Link
                to="/Order"
                className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                  location.pathname === "/Order"
                    ? "bg-blue-800 rounded-r-full"
                    : "hover:bg-blue-600"
                }`}
              >
                <ClipboardList size={20} />
                {isOpen && <span>Orders</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/OrderDelivery"
                className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                  location.pathname === "/OrderDelivery"
                    ? "bg-blue-800 rounded-r-full"
                    : "hover:bg-blue-600"
                }`}
              >
                <Truck size={20} />
                {isOpen && <span>Delivery</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-4 border-t border-blue-500">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};
// --- END OF SIDEBAR COMPONENT ---

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pendingOrders: 0,
    deliveredOrders: 0,
    revenueToday: "0.00",
    pendingPayments: "0.00",
    chartData: { labels: [], data: [] }, // Added for the chart
  });

  // --- 1. FETCH AND PROCESS ALL ORDER DATA ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${API_URL}/orders`, {
          withCredentials: true,
        });

        const orders = res.data; // This is now an array of all orders
        
        const today = new Date().toISOString().split('T')[0];
        let revenueToday = 0;
        let pendingPayments = 0;
        const revenueByDate = {};
        
        const pendingOrders = orders.filter(o => !o.isDelivered);
        const deliveredOrders = orders.filter(o => o.isDelivered);

        // Calculate pending payments from PENDING orders
        pendingPayments = pendingOrders.reduce((sum, order) => sum + order.Balance, 0);

        // Calculate revenue from DELIVERED orders
        deliveredOrders.forEach(order => {
          if (order.customerPayment > 0 && order.actualDeliveryDate) {
            const deliveryDate = order.actualDeliveryDate;
            
            // Check for today's revenue
            if (deliveryDate === today) {
              revenueToday += order.customerPayment;
            }
            
            // Group for chart
            revenueByDate[deliveryDate] = (revenueByDate[deliveryDate] || 0) + order.customerPayment;
          }
        });
        
        // --- Process data for the chart ---
        const sortedDates = Object.keys(revenueByDate).sort();
        const chartLabels = sortedDates.map(date => new Date(date).toLocaleDateString());
        const chartData = sortedDates.map(date => revenueByDate[date]);

        setStats({
          pendingOrders: pendingOrders.length,
          deliveredOrders: deliveredOrders.length,
          revenueToday: revenueToday.toFixed(2),
          pendingPayments: pendingPayments.toFixed(2),
          chartData: { labels: chartLabels, data: chartData },
        });

      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert("Your session has expired. Please log in again.");
          navigate("/");
        } else {
          console.error("Error fetching dashboard data:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // --- 2. EFFECT TO DRAW/UPDATE THE CHART ---
  useEffect(() => {
    // Don't draw an empty chart
    if (stats.chartData.labels.length === 0) return;

    const initializeChart = () => {
      const ctx = document.getElementById('revenueChart');
      if (!ctx) return; // Canvas not ready

      // If a chart instance already exists, destroy it
      if (window.myRevenueChart) {
        window.myRevenueChart.destroy();
      }
      
      // We need window.Chart to be available
      if (!window.Chart) {
        console.error("Chart.js is not loaded");
        return;
      }

      window.myRevenueChart = new window.Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
          labels: stats.chartData.labels,
          datasets: [{
            label: 'Daily Revenue (Rs.)',
            data: stats.chartData.data,
            borderColor: 'rgb(79, 70, 229)',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            fill: true,
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allows chart to fill container height
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                // Format as currency
                callback: (value) => `Rs. ${value}`
              }
            }
          }
        }
      });
    };

    // Load Chart.js script if it's not already loaded
    if (!window.Chart) {
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/chart.js";
      script.async = true;
      script.onload = initializeChart; // Initialize after script loads
      document.body.appendChild(script);
    } else {
      initializeChart(); // Already loaded, just initialize
    }
    
    // Cleanup function to destroy chart on unmount
    return () => {
      if (window.myRevenueChart) {
        window.myRevenueChart.destroy();
        window.myRevenueChart = null;
      }
    };
    
    // Re-draw chart if data changes or if sidebar animation resizes canvas
  }, [stats.chartData, isOpen]); 


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar Component */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // handleLogout is now defined *inside* the Sidebar
      />

      {/* Main Content - Adjusted for fixed sidebar */}
      <div
        className={`flex flex-col min-h-screen bg-gray-100 flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        <header className="w-full bg-stone-50 py-4 px-6 flex items-center justify-start shadow-md">
          <div className="text-black text-xl font-semibold">
            Dashboard Overview
          </div>
        </header>

        <div className="flex flex-1 p-6">
          <main className="flex-1 bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Welcome to Your Laundry Dashboard!
            </h2>

            {/* Dashboard Cards/Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Card 1: Pending Orders */}
              <div className="bg-yellow-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                  Pending Orders
                </h3>
                <p className="text-4xl font-bold text-yellow-700">
                  {loading ? "..." : stats.pendingOrders}
                </p>
                <p className="text-gray-600 mt-2">
                  Orders awaiting delivery.
                </p>
                <button
                  onClick={() => navigate("/Order")} // Link to the Orders page
                  className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                >
                  View Pending
                </button>
              </div>

              {/* Card 2: Delivered Orders */}
              <div className="bg-green-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-green-800 mb-4">
                  Delivered Orders
                </h3>
                <p className="text-4xl font-bold text-green-700">
                  {loading ? "..." : stats.deliveredOrders}
                </p>
                <p className="text-gray-600 mt-2">
                  Total completed orders.
                </p>
                <button
                  onClick={() => navigate("/OrderDelivery")} // Link to the Delivery page
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                >
                  View Delivered
                </button>
              </div>

              {/* Card 3: Pending Payments */}
              <div className="bg-red-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-red-800 mb-4">
                  Pending Payments
                </h3>
                <p className="text-4xl font-bold text-red-700">
                  Rs.{loading ? "..." : stats.pendingPayments}
                </p>
                <p className="text-gray-600 mt-2">
                  Total outstanding balance.
                </p>
                 <button
                  onClick={() => navigate("/Order")} 
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                >
                  View Pending
                </button>
              </div>

              {/* Card 4: Revenue Today */}
              <div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">
                  Revenue Today
                </h3>
                <p className="text-4xl font-bold text-blue-700">
                  Rs.{loading ? "..." : stats.revenueToday}
                </p>
                <p className="text-gray-600 mt-2">
                  Total payments received today.
                </p>
                <button
                  onClick={() => navigate("/OrderDelivery")} 
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                >
                  View Report
                </button>
              </div>
            </div>

            {/* --- NEW REVENUE CHART --- */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Revenue Over Time
              </h3>
              {/* Chart.js Canvas Container */}
              <div className="w-full max-w-4xl mx-auto h-96">
                <canvas id="revenueChart"></canvas>
              </div>
            </div>
            
          </main>
        </div>
      </div>
    </div>
  );
}