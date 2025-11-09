// // src/pages/Order.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   X,
//   Edit,
//   Trash2,
//   LogOut,
//   Menu,
//   Home,
//   ShoppingCart,
//   Truck,
//   ChevronDown,
// } from "lucide-react"; // Import new icons
// import axios from "axios";

// // Define your backend's URL
// const API_URL = "http://localhost:8080/api";

// // --- PLACEHOLDER SIDEBAR COMPONENT ---
// // This component is added here to resolve the import error.
// const Sidebar = ({ isOpen, setIsOpen, handleLogout }) => {
//   const navigate = useNavigate();
//   return (
//     <div
//       className={`fixed top-0 left-0 h-full bg-blue-800 text-white transition-all duration-300 ${
//         isOpen ? "w-64" : "w-20"
//       } shadow-lg z-50`}
//     >
//       <div className="flex flex-col h-full">
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

// // Helper function to format a Date object to 'YYYY-MM-DD'
// const formatDateToYYYYMMDD = (date) => {
//   if (!date) return "";
//   const d = new Date(date);
//   let month = "" + (d.getMonth() + 1);
//   let day = "" + d.getDate();
//   const year = d.getFullYear();

//   if (month.length < 2) month = "0" + month;
//   if (day.length < 2) day = "0" + day;

//   return [year, month, day].join("-");
// };

// // Helper function to parse 'YYYY-MM-DD' string to a Date object
// const parseYYYYMMDD = (dateString) => {
//   if (!dateString) return new Date();
//   const parts = dateString.split("-");
//   return new Date(parts[0], parts[1] - 1, parts[2]);
// };

// // --- *** CRITICAL FIX *** ---
// // This map now matches your latest database/database.js file
// const SERVICE_COLUMN_MAP = {
//   WashAndDry: "Wash & Dry",
//   After5Days: "Dry Clean (5 Days)",
//   After3Days: "Dry Clean (3 Days)",
//   AfterOneDay: "Dry Clean (1 Day)",
//   DryExpress: "Dry Clean (Express)",
//   Ironing: "Ironing",
//   PressingExpress: "Pressing (Express)",
//   PressingNormal: "Pressing (Normal)",
// };

// export default function Order() {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(true);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showModal, setShowModal] = useState(false);

//   const [form, setForm] = useState({
//     customerName: "",
//     teleNo: "",
//     address: "",
//   });

//   // State for the modal
//   const [type, setType] = useState(""); // Gents/Ladies
//   const [availableItems, setAvailableItems] = useState([]); // Items from backend
//   const [selectedItems, setSelectedItems] = useState([]); // Items added to the order
//   const [advance, setAdvance] = useState(0);

//   // --- NEW --- State for accordion
//   const [expandedItemId, setExpandedItemId] = useState(null);

//   const [orders, setOrders] = useState([]);
//   const [editingBillNo, setEditingBillNo] = useState(null);

//   // Function to reset all form and modal states
//   const resetAllFormStates = () => {
//     setForm({
//       customerName: "",
//       teleNo: "",
//       address: "",
//     });
//     setSelectedDate(new Date());
//     setType("");
//     setAvailableItems([]);
//     setSelectedItems([]);
//     setAdvance(0);
//     setEditingBillNo(null);
//     setExpandedItemId(null); // Reset accordion
//   };

//   const handleInput = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // --- Fetch items when type (Gents/Ladies) is selected ---
//   useEffect(() => {
//     if (!type) {
//       setAvailableItems([]);
//       return;
//     }
//     const fetchItems = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/items/${type.toLowerCase()}`, {
//           withCredentials: true,
//         });
//         setAvailableItems(res.data);
//       } catch (err) {
//         console.error("Error fetching items:", err);
//       }
//     };
//     fetchItems();
//   }, [type]);

//   // --- Add an item with a specific service and quantity ---
//   const handleAddItemToOrder = (item, serviceColumn, price) => {
//     if (price === null || price === 0) {
//       alert("This service is not available for this item.");
//       return;
//     }

//     setSelectedItems((prev) => {
//       const existingItem = prev.find(
//         (i) => i.name === item.Items && i.service === serviceColumn
//       );

//       if (existingItem) {
//         // Increment quantity
//         return prev.map((i) =>
//           i.name === item.Items && i.service === serviceColumn
//             ? { ...i, quantity: i.quantity + 1 }
//             : i
//         );
//       } else {
//         // Add new item
//         return [
//           ...prev,
//           {
//             name: item.Items,
//             quantity: 1,
//             service: serviceColumn,
//             serviceName: SERVICE_COLUMN_MAP[serviceColumn],
//             pricePerUnit: price,
//           },
//         ];
//       }
//     });
//   };

//   // --- Remove item from selected list ---
//   const handleRemoveItem = (index) => {
//     setSelectedItems((prev) => prev.filter((_, i) => i !== index));
//   };

//   // --- Calculate total from selected items ---
//   const total = selectedItems.reduce(
//     (sum, item) => sum + item.pricePerUnit * item.quantity,
//     0
//   );
//   const balance = total - advance;

//   // --- Fetches all orders from the DB on component mount ---
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/orders`, {
//           withCredentials: true,
//         });
//         setOrders(res.data);
//       } catch (err) {
//         if (err.response && err.response.status === 401) {
//           alert("Session expired. Please log in.");
//           navigate("/");
//         } else {
//           console.error("Error fetching orders:", err);
//           alert("Error fetching orders.");
//         }
//       }
//     };
//     fetchOrders();
//   }, [navigate]);

//   // --- CONNECTED to Backend ---
//   const handleSaveOrUpdateOrder = async () => {
//     const itemsToSave = selectedItems.map((item) => ({
//       item: item.name,
//       type: type,
//       service: item.serviceName,
//       quantity: item.quantity,
//       price: item.pricePerUnit * item.quantity,
//     }));

//     const orderData = {
//       Date: formatDateToYYYYMMDD(selectedDate),
//       CustomerName: form.customerName,
//       Telephone: form.teleNo,
//       Address: form.address,
//       ServiceType: selectedItems.map((i) => i.serviceName).join(", "),
//       DeliveryTime: "", // This field is no longer relevant
//       Items: itemsToSave,
//       Advance: advance,
//       Balance: balance,
//     };

//     try {
//       if (editingBillNo) {
//         // --- UPDATE (PUT) ---
//         await axios.put(
//           `${API_URL}/orders/${editingBillNo}`,
//           orderData,
//           { withCredentials: true }
//         );
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order.BillNo === editingBillNo
//               ? { ...order, ...orderData, BillNo: editingBillNo }
//               : order
//           )
//         );
//         alert("Order updated successfully!");
//       } else {
//         // --- CREATE (POST) ---
//         const res = await axios.post(`${API_URL}/orders`, orderData, {
//           withCredentials: true,
//         });
//         setOrders((prevOrders) => [
//           ...prevOrders,
//           { ...orderData, BillNo: res.data.BillNo },
//         ]);
//         alert("Order added successfully!");
//       }

//       setShowModal(false);
//       resetAllFormStates();
//     } catch (err) {
//       console.error("Error saving order:", err);
//       if (err.response) {
//         alert(err.response.data.message);
//       } else {
//         alert("An error occurred while saving the order.");
//       }
//     }
//   };

//   // --- Pre-populates the form for editing ---
//   const handleEditOrder = (orderToEdit) => {
//     setEditingBillNo(orderToEdit.BillNo);

//     setForm({
//       customerName: orderToEdit.CustomerName,
//       teleNo: orderToEdit.Telephone,
//       address: orderToEdit.Address,
//     });

//     setSelectedDate(parseYYYYMMDD(orderToEdit.Date));

//     // Re-build the selectedItems list
//     const itemsFromOrder = orderToEdit.Items.map((item) => ({
//       name: item.item,
//       quantity: item.quantity,
//       service: Object.keys(SERVICE_COLUMN_MAP).find(
//         (key) => SERVICE_COLUMN_MAP[key] === item.service
//       ),
//       serviceName: item.service,
//       // Recalculate price per unit
//       pricePerUnit: item.price / item.quantity,
//     }));

//     setSelectedItems(itemsFromOrder);
//     setAdvance(orderToEdit.Advance);
//     setType(orderToEdit.Items.length > 0 ? orderToEdit.Items[0].type : "Gents");

//     setShowModal(true);
//   };

//   // --- CONNECTED to Backend ---
//   const handleDeleteOrder = async (billNoToDelete) => {
//     if (window.confirm("Are you sure you want to delete this order?")) {
//       try {
//         await axios.delete(`${API_URL}/orders/${billNoToDelete}`, {
//           withCredentials: true,
//         });
//         setOrders((prevOrders) =>
//           prevOrders.filter((order) => order.BillNo !== billNoToDelete)
//         );
//         alert("Order deleted successfully!");
//       } catch (err) {
//         console.error("Error deleting order:", err);
//         if (err.response) {
//           alert(err.response.data.message);
//         } else {
//           alert("An error occurred while deleting the order.");
//         }
//       }
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     resetAllFormStates();
//   };

//   const handleBack = () => navigate("/MainPage");

//   // --- CONNECTED to Backend ---
//   const handleLogout = async () => {
//     if (window.confirm("Are you sure you want to log out?")) {
//       try {
//         await axios.post(
//           `${API_URL}/auth/logout`,
//           {},
//           {
//             withCredentials: true,
//           }
//         );
//       } catch (err) {
//         console.error("Error logging out:", err);
//       } finally {
//         navigate("/");
//       }
//     }
//   };

//   // Effect to reset form when not editing
//   useEffect(() => {
//     if (!editingBillNo && !showModal) {
//       resetAllFormStates();
//     }
//   }, [editingBillNo, showModal]);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         handleLogout={handleLogout}
//         handleBack={handleBack}
//       />

//       {/* Main Content Area */}
//       <div
//         className={`flex-1 bg-gray-200 p-4 flex flex-col max-w-screen items-center transition-all duration-300 ${
//           isOpen ? "ml-64" : "ml-20"
//         }`}
//       >
//         <div className="bg-white shadow-lg rounded-xl p-8 max-w-7xl w-full relative mb-8">
//           <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//             {editingBillNo ? `Edit Order: ${editingBillNo}` : "Add Order Form"}
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//             <div className="relative">
//               <label className="block mb-1 text-gray-700 text-sm font-medium">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 value={formatDateToYYYYMMDD(selectedDate)}
//                 onChange={(e) => setSelectedDate(parseYYYYMMDD(e.target.value))}
//                 className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-gray-700 text-sm font-medium">
//                 Customer Name :
//               </label>
//               <input
//                 type="text"
//                 name="customerName"
//                 value={form.customerName}
//                 onChange={handleInput}
//                 placeholder="Value"
//                 className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-gray-700 text-sm font-medium">
//                 Tele.No
//               </label>
//               <input
//                 type="text"
//                 name="teleNo"
//                 value={form.teleNo}
//                 onChange={handleInput}
//                 placeholder="Value"
//                 className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
//               />
//             </div>
//           </div>

//           <div className="mt-6">
//             <label className="block mb-1 text-gray-700 text-sm font-medium">
//               Address:
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={form.address}
//               onChange={handleInput}
//               placeholder="Value"
//               className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
//             />
//           </div>

//           <button
//             onClick={() => setShowModal(true)}
//             className="mt-8 bg-purple-700 hover:bg-purple-800 text-white py-3 w-full rounded-md font-semibold transition-all flex items-center justify-center space-x-2"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 4v16m8-8H4"
//               />
//             </svg>
//             <span>
//               {editingBillNo
//                 ? "Edit Items / Services"
//                 : "Select Items / Services"}
//             </span>
//           </button>
//         </div>

//         {/* Orders Table - NOW CONNECTED */}
//         <div className="bg-white shadow-lg rounded-xl p-8 max-w-7xl w-full">
//           <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//             Added Orders
//           </h2>
//           {orders.length === 0 ? (
//             <p className="text-gray-600">No orders found in database.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Bill No
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Customer
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Order Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Items
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Total
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Advance
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Balance
//                     </th>
//                     <th className="relative px-6 py-3">
//                       <span className="sr-only">Actions</span>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {orders.map((order) => (
//                     <tr key={order.BillNo} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {order.BillNo}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {order.CustomerName}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(order.Date).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
//                         {order.Items.map(
//                           (item) =>
//                             `${item.item} (${item.service}) (x${item.quantity})`
//                         ).join(", ")}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {(order.Advance + order.Balance).toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {order.Advance.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {order.Balance.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => handleEditOrder(order)}
//                             className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-100 transition-colors"
//                             title="Edit Order"
//                           >
//                             <Edit size={20} />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteOrder(order.BillNo)}
//                             className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-100 transition-colors"
//                             title="Delete Order"
//                           >
//                             <Trash2 size={20} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- RESPONSIVE MODAL & ACCORDION ITEMS --- */}
//       {showModal && (
//         <div className="fixed inset-0 bg-stone-950/90 flex items-center justify-center z-50 p-4">
//           {/* --- RESPONSIVE WIDTH & HEIGHT --- */}
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] relative overflow-hidden flex flex-col">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-20 p-1 rounded-full bg-white hover:bg-gray-100"
//               aria-label="Close modal"
//             >
//               <X size={24} />
//             </button>
//             <h2 className="text-3xl font-bold text-gray-800 text-center p-6 border-b">
//               {editingBillNo
//                 ? "Edit Items & Services"
//                 : "Select Items & Services"}
//             </h2>

//             {/* --- RESPONSIVE LAYOUT (STACKS ON MOBILE) --- */}
//             <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
//               {/* Left Section - Item & Service Selection */}
//               <div className="md:w-3/5 p-6 overflow-y-auto border-r-0 md:border-r md:border-r-gray-200">
//                 <div className="flex gap-2 mb-4">
//                   {["Gents", "Ladies"].map((t) => (
//                     <button
//                       key={t}
//                       onClick={() => setType(t)}
//                       className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
//                         type === t
//                           ? "bg-yellow-600 text-white shadow"
//                           : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
//                       }`}
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>

//                 {/* --- ACCORDION ITEM LIST --- */}
//                 <div className="space-y-2">
//                   {availableItems.length === 0 && type && <p>Loading...</p>}
//                   {availableItems.map((item) => (
//                     <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
//                       <button
//                         onClick={() =>
//                           setExpandedItemId(
//                             expandedItemId === item.id ? null : item.id
//                           )
//                         }
//                         className="w-full flex justify-between items-center p-4"
//                       >
//                         <h3 className="font-bold text-lg text-gray-800">
//                           {item.Items}
//                         </h3>
//                         <ChevronDown
//                           size={20}
//                           className={`transition-transform ${
//                             expandedItemId === item.id ? "rotate-180" : ""
//                           }`}
//                         />
//                       </button>
                      
//                       {/* --- EXPANDABLE CONTENT --- */}
//                       {expandedItemId === item.id && (
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 border-t border-gray-200 bg-white">
//                           {Object.keys(SERVICE_COLUMN_MAP).map((colName) => {
//                             const price = item[colName];
//                             if (price !== null && price > 0) {
//                               return (
//                                 <button
//                                   key={colName}
//                                   onClick={() =>
//                                     handleAddItemToOrder(item, colName, price)
//                                   }
//                                   className="bg-blue-100 text-blue-800 p-2 rounded-md text-sm hover:bg-blue-200 transition text-left"
//                                 >
//                                   <span className="font-semibold">
//                                     {SERVICE_COLUMN_MAP[colName]}
//                                   </span>
//                                   <br />
//                                   <span className="text-xs">
//                                     Rs. {price.toFixed(2)}
//                                   </span>
//                                 </button>
//                               );
//                             }
//                             return null;
//                           })}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Right Section (Total & Actions) */}
//               <div className="md:w-2/5 bg-gray-800 text-white p-6 flex flex-col justify-between overflow-y-auto">
//                 <div>
//                   <h2 className="text-3xl font-bold mb-6 text-center text-purple-200">
//                     Order Summary
//                   </h2>

//                   {/* Selected Items List */}
//                   <div className="bg-gray-700 p-4 rounded-lg mb-4 max-h-60 overflow-y-auto">
//                     {selectedItems.length === 0 ? (
//                       <p className="text-gray-400 text-center">
//                         No items added yet.
//                       </p>
//                     ) : (
//                       selectedItems.map((item, index) => (
//                         <div
//                           key={index}
//                           className="flex justify-between items-center text-white border-b border-gray-600 py-2"
//                         >
//                           <div>
//                             <p className="font-semibold">
//                               {item.name} (x{item.quantity})
//                             </p>
//                             <p className="text-xs text-gray-300">
//                               {item.serviceName}
//                             </p>
//                           </div>
//                           <div className="flex items-center">
//                             <span className="font-medium mr-4">
//                               Rs. {(item.pricePerUnit * item.quantity).toFixed(2)}
//                             </span>
//                             <button
//                               onClick={() => handleRemoveItem(index)}
//                               className="text-red-400 hover:text-red-300"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           </div>
//                         </div>
//                       ))
//                     )}
//                   </div>

//                   <div className="bg-gray-700 p-4 rounded-lg mb-4">
//                     <p className="text-lg font-medium text-gray-300">
//                       Subtotal:
//                     </p>
//                     <p className="text-4xl font-extrabold text-white mb-6">
//                       Rs.{total.toFixed(2)}
//                     </p>
//                   </div>

//                   <div className="mt-4">
//                     <label className="block text-gray-300 font-medium mb-2">
//                       Advance Payment:
//                     </label>
//                     <input
//                       type="number"
//                       value={advance}
//                       onChange={(e) =>
//                         setAdvance(parseFloat(e.target.value) || 0)
//                       }
//                       className="w-full mt-1 text-gray-900 p-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-purple-400"
//                       placeholder="0.00"
//                     />
//                   </div>

//                   <div className="mt-6 p-4 bg-purple-600 rounded-lg">
//                     <label className="block text-purple-100 font-semibold mb-2">
//                       Balance Due:
//                     </label>
//                     <div className="bg-white text-gray-900 p-3 rounded-md font-bold text-2xl text-center">
//                       Rs.{balance.toFixed(2)}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="mt-8 flex flex-row gap-4">
//                   <button
//                     onClick={handleSaveOrUpdateOrder}
//                     className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold text-lg transition-colors shadow-md"
//                   >
//                     {editingBillNo ? "Update Order" : "Save Order"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// src/pages/Order.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"; // Import Link and useLocation
import {
  X,
  Edit,
  Trash2,
  LogOut,
  Menu,
  Home,
  ShoppingCart,
  Truck,
  ChevronDown,
  LayoutDashboard, // Added for Sidebar
  Shirt, // Added for Sidebar
  ClipboardList, // Added for Sidebar
} from "lucide-react"; // Import new icons
import axios from "axios";

// Define your backend's URL
const API_URL = "http://localhost:8080/api";

// --- SIDEBAR COMPONENT IS NOW EMBEDDED ---
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
                {isOpen && <span>Add Items</span>}
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

// Helper function to format a Date object to 'YYYY-MM-DD'
const formatDateToYYYYMMDD = (date) => {
  if (!date) return "";
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

// Helper function to parse 'YYYY-MM-DD' string to a Date object
const parseYYYYMMDD = (dateString) => {
  if (!dateString) return new Date();
  const parts = dateString.split("-");
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

// --- *** CRITICAL FIX *** ---
// This map now matches your latest database/database.js file
const SERVICE_COLUMN_MAP = {
  WashAndDry: "Wash & Dry",
  After5Days: "Dry Clean (5 Days)",
  After3Days: "Dry Clean (3 Days)",
  AfterOneDay: "Dry Clean (1 Day)",
  DryExpress: "Dry Clean (Express)",
  Ironing: "Ironing",
  PressingExpress: "Pressing (Express)",
  PressingNormal: "Pressing (Normal)",
};

export default function Order() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    teleNo: "",
    address: "",
  });

  // State for the modal
  const [type, setType] = useState(""); // Gents/Ladies
  const [availableItems, setAvailableItems] = useState([]); // Items from backend
  const [selectedItems, setSelectedItems] = useState([]); // Items added to the order
  const [advance, setAdvance] = useState(0);

  // --- NEW --- State for accordion
  const [expandedItemId, setExpandedItemId] = useState(null);

  const [orders, setOrders] = useState([]); // This will hold ALL orders
  const [editingBillNo, setEditingBillNo] = useState(null);

  // Function to reset all form and modal states
  const resetAllFormStates = () => {
    setForm({
      customerName: "",
      teleNo: "",
      address: "",
    });
    setSelectedDate(new Date());
    setType("");
    setAvailableItems([]);
    setSelectedItems([]);
    setAdvance(0);
    setEditingBillNo(null);
    setExpandedItemId(null); // Reset accordion
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- Fetch items when type (Gents/Ladies) is selected ---
  useEffect(() => {
    if (!type) {
      setAvailableItems([]);
      return;
    }
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_URL}/items/${type.toLowerCase()}`, {
          withCredentials: true,
        });
        setAvailableItems(res.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, [type]);

  // --- Add an item with a specific service and quantity ---
  const handleAddItemToOrder = (item, serviceColumn, price) => {
    if (price === null || price === 0) {
      alert("This service is not available for this item.");
      return;
    }

    setSelectedItems((prev) => {
      const existingItem = prev.find(
        (i) => i.name === item.Items && i.service === serviceColumn
      );

      if (existingItem) {
        // Increment quantity
        return prev.map((i) =>
          i.name === item.Items && i.service === serviceColumn
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        // Add new item
        return [
          ...prev,
          {
            name: item.Items,
            quantity: 1,
            service: serviceColumn,
            serviceName: SERVICE_COLUMN_MAP[serviceColumn],
            pricePerUnit: price,
          },
        ];
      }
    });
  };

  // --- Remove item from selected list ---
  const handleRemoveItem = (index) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  // --- Calculate total from selected items ---
  const total = selectedItems.reduce(
    (sum, item) => sum + item.pricePerUnit * item.quantity,
    0
  );
  const balance = total - advance;

  // --- Fetches all orders from the DB on component mount ---
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/orders`, {
          withCredentials: true,
        });
        setOrders(res.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert("Session expired. Please log in.");
          navigate("/");
        } else {
          console.error("Error fetching orders:", err);
          alert("Error fetching orders.");
        }
      }
    };
    fetchOrders();
  }, [navigate]);

  // --- CONNECTED to Backend ---
  const handleSaveOrUpdateOrder = async () => {
    const itemsToSave = selectedItems.map((item) => ({
      item: item.name,
      type: type,
      service: item.serviceName,
      quantity: item.quantity,
      price: item.pricePerUnit * item.quantity,
    }));

    const orderData = {
      Date: formatDateToYYYYMMDD(selectedDate),
      CustomerName: form.customerName,
      Telephone: form.teleNo,
      Address: form.address,
      ServiceType: selectedItems.map((i) => i.serviceName).join(", "),
      DeliveryTime: "", // This field is no longer relevant
      Items: itemsToSave,
      Advance: advance,
      Balance: balance,
      // --- NEW: Explicitly set isDelivered when creating/updating ---
      isDelivered: false,
      actualDeliveryDate: null,
      customerPayment: null
    };

    try {
      if (editingBillNo) {
        // --- UPDATE (PUT) ---
        // We must also send the delivery status, or it will be reset
        const originalOrder = orders.find(o => o.BillNo === editingBillNo);
        const dataToSend = {
          ...orderData,
          isDelivered: originalOrder.isDelivered,
          actualDeliveryDate: originalOrder.actualDeliveryDate,
          customerPayment: originalOrder.customerPayment
        };
        
        await axios.put(
          `${API_URL}/orders/${editingBillNo}`,
          dataToSend,
          { withCredentials: true }
        );
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.BillNo === editingBillNo
              ? { ...dataToSend, BillNo: editingBillNo }
              : order
          )
        );
        alert("Order updated successfully!");
      } else {
        // --- CREATE (POST) ---
        const res = await axios.post(`${API_URL}/orders`, orderData, {
          withCredentials: true,
        });
        setOrders((prevOrders) => [
          ...prevOrders,
          { ...orderData, BillNo: res.data.BillNo },
        ]);
        alert("Order added successfully!");
      }

      setShowModal(false);
      resetAllFormStates();
    } catch (err) {
      console.error("Error saving order:", err);
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("An error occurred while saving the order.");
      }
    }
  };

  // --- Pre-populates the form for editing ---
  const handleEditOrder = (orderToEdit) => {
    setEditingBillNo(orderToEdit.BillNo);

    setForm({
      customerName: orderToEdit.CustomerName,
      teleNo: orderToEdit.Telephone,
      address: orderToEdit.Address,
    });

    setSelectedDate(parseYYYYMMDD(orderToEdit.Date));

    // Re-build the selectedItems list
    const itemsFromOrder = orderToEdit.Items.map((item) => ({
      name: item.item,
      quantity: item.quantity,
      service: Object.keys(SERVICE_COLUMN_MAP).find(
        (key) => SERVICE_COLUMN_MAP[key] === item.service
      ),
      serviceName: item.service,
      // Recalculate price per unit
      pricePerUnit: item.price / item.quantity,
    }));

    setSelectedItems(itemsFromOrder);
    setAdvance(orderToEdit.Advance);
    setType(orderToEdit.Items.length > 0 ? orderToEdit.Items[0].type : "Gents");

    setShowModal(true);
  };

  // --- CONNECTED to Backend ---
  const handleDeleteOrder = async (billNoToDelete) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${API_URL}/orders/${billNoToDelete}`, {
          withCredentials: true,
        });
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.BillNo !== billNoToDelete)
        );
        alert("Order deleted successfully!");
      } catch (err) {
        console.error("Error deleting order:", err);
        if (err.response) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred while deleting the order.");
        }
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetAllFormStates();
  };

  // Effect to reset form when not editing
  useEffect(() => {
    if (!editingBillNo && !showModal) {
      resetAllFormStates();
    }
  }, [editingBillNo, showModal]);

  // --- *** THIS IS THE FIX *** ---
  // Filter all orders to only show PENDING orders
  const pendingOrders = orders.filter((order) => !order.isDelivered);
  // --- END OF FIX ---

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // handleLogout is now defined *inside* the Sidebar
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 bg-gray-200 p-4 flex flex-col max-w-screen items-center transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-7xl w-full relative mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {editingBillNo ? `Edit Order: ${editingBillNo}` : "Add Order Form"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="relative">
              <label className="block mb-1 text-gray-700 text-sm font-medium">
                Date
              </label>
              <input
                type="date"
                value={formatDateToYYYYMMDD(selectedDate)}
                onChange={(e) => setSelectedDate(parseYYYYMMDD(e.target.value))}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
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
            onClick={() => setShowModal(true)}
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
            <span>
              {editingBillNo
                ? "Edit Items / Services"
                : "Select Items / Services"}
            </span>
          </button>
        </div>

        {/* --- UPDATED Orders Table (now filters for PENDING orders) --- */}
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-7xl w-full">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Pending Orders
          </h2>
          {/* --- FIX --- */}
          {pendingOrders.length === 0 ? (
            <p className="text-gray-600">No pending orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bill No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Advance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Balance
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* --- FIX --- */}
                  {pendingOrders.map((order) => (
                    <tr key={order.BillNo} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.BillNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.CustomerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.Date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {order.Items.map(
                          (item) =>
                            `${item.item} (${item.service}) (x${item.quantity})`
                        ).join(", ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(order.Advance + order.Balance).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.Advance.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.Balance.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditOrder(order)}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-100 transition-colors"
                            title="Edit Order"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.BillNo)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-100 transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* --- RESPONSIVE MODAL & ACCORDION ITEMS --- */}
      {showModal && (
        <div className="fixed inset-0 bg-stone-950/90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] relative overflow-hidden flex flex-col">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-20 p-1 rounded-full bg-white hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold text-gray-800 text-center p-6 border-b">
              {editingBillNo
                ? "Edit Items & Services"
                : "Select Items & Services"}
            </h2>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Left Section - Item & Service Selection */}
              <div className="md:w-3/5 p-6 overflow-y-auto border-r-0 md:border-r md:border-r-gray-200">
                <div className="flex gap-2 mb-4">
                  {["Gents", "Ladies"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                        type === t
                          ? "bg-yellow-600 text-white shadow"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* --- ACCORDION ITEM LIST --- */}
                <div className="space-y-2">
                  {availableItems.length === 0 && type && <p>Loading...</p>}
                  {availableItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                      <button
                        onClick={() =>
                          setExpandedItemId(
                            expandedItemId === item.id ? null : item.id
                          )
                        }
                        className="w-full flex justify-between items-center p-4"
                      >
                        <h3 className="font-bold text-lg text-gray-800">
                          {item.Items}
                        </h3>
                        <ChevronDown
                          size={20}
                          className={`transition-transform ${
                            expandedItemId === item.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      
                      {/* --- EXPANDABLE CONTENT --- */}
                      {expandedItemId === item.id && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 border-t border-gray-200 bg-white">
                          {Object.keys(SERVICE_COLUMN_MAP).map((colName) => {
                            const price = item[colName];
                            if (price !== null && price > 0) {
                              return (
                                <button
                                  key={colName}
                                  onClick={() =>
                                    handleAddItemToOrder(item, colName, price)
                                  }
                                  className="bg-blue-100 text-blue-800 p-2 rounded-md text-sm hover:bg-blue-200 transition text-left"
                                >
                                  <span className="font-semibold">
                                    {SERVICE_COLUMN_MAP[colName]}
                                  </span>
                                  <br />
                                  <span className="text-xs">
                                    Rs. {price.toFixed(2)}
                                  </span>
                                </button>
                              );
                            }
                            return null;
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Section (Total & Actions) */}
              <div className="md:w-2/5 bg-gray-800 text-white p-6 flex flex-col justify-between overflow-y-auto">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-center text-purple-200">
                    Order Summary
                  </h2>

                  {/* Selected Items List */}
                  <div className="bg-gray-700 p-4 rounded-lg mb-4 max-h-60 overflow-y-auto">
                    {selectedItems.length === 0 ? (
                      <p className="text-gray-400 text-center">
                        No items added yet.
                      </p>
                    ) : (
                      selectedItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-white border-b border-gray-600 py-2"
                        >
                          <div>
                            <p className="font-semibold">
                              {item.name} (x{item.quantity})
                            </p>
                            <p className="text-xs text-gray-300">
                              {item.serviceName}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-4">
                              Rs. {(item.pricePerUnit * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => handleRemoveItem(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg mb-4">
                    <p className="text-lg font-medium text-gray-300">
                      Subtotal:
                    </p>
                    <p className="text-4xl font-extrabold text-white mb-6">
                      Rs.{total.toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="block text-gray-300 font-medium mb-2">
                      Advance Payment:
                    </label>
                    <input
                      type="number"
                      value={advance}
                      onChange={(e) =>
                        setAdvance(parseFloat(e.target.value) || 0)
                      }
                      className="w-full mt-1 text-gray-900 p-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-purple-400"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="mt-6 p-4 bg-purple-600 rounded-lg">
                    <label className="block text-purple-100 font-semibold mb-2">
                      Balance Due:
                    </label>
                    <div className="bg-white text-gray-900 p-3 rounded-md font-bold text-2xl text-center">
                      Rs.{balance.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-row gap-4">
                  <button
                    onClick={handleSaveOrUpdateOrder}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold text-lg transition-colors shadow-md"
                  >
                    {editingBillNo ? "Update Order" : "Save Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}