// // src/pages/Delivery.jsx - The "Delivery Management Hub"
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/sidebar";
// import {
//   Search,
//   CheckCircle,
//   Package,
//   Truck,
//   ReceiptText,
//   Pencil,
//   Trash2,
//   XCircle,
//   Save,
//   RefreshCcw,
//   ListOrdered,
//   Loader,
//   DollarSign, // Added for payment icon
// } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // --- Example Orders Data ---
// const EXAMPLE_ORDERS = [
//   {
//     id: 1,
//     billNo: "B001",
//     customerName: "Alice Smith",
//     teleNo: "0712345678",
//     address: "123 Main St, City",
//     orderDate: "03/10/2024",
//     service: "Wash & Dry",
//     delivery: "After 03 Days",
//     type: "Gent",
//     items: [
//       { name: "T shirt", quantity: 2, price: 500 },
//       { name: "Trouser", quantity: 1, price: 750 },
//     ],
//     advance: 500,
//     total: 1750,
//     balance: 1250,
//     isDelivered: false,
//     actualDeliveryDate: null,
//     customerPayment: null, // Added for existing orders too
//   },
//   {
//     id: 2,
//     billNo: "B002",
//     customerName: "Bob Johnson",
//     teleNo: "0778765432",
//     address: "45 Oak Ave, Town",
//     orderDate: "03/09/2024",
//     service: "Dry Cleaning",
//     delivery: "One Day",
//     type: "Ladies",
//     items: [
//       { name: "Saree", quantity: 1, price: 1200 },
//       { name: "Blouse", quantity: 1, price: 300 },
//     ],
//     advance: 800,
//     total: 1500,
//     balance: 700,
//     isDelivered: true,
//     actualDeliveryDate: "2024-03-14",
//     customerPayment: 1500, // Example payment
//   },
//   {
//     id: 3,
//     billNo: "B003",
//     customerName: "Charlie Brown",
//     teleNo: "0761122334",
//     address: "789 Pine Ln, Village",
//     orderDate: "03/08/2024",
//     service: "Pressing",
//     delivery: "Normal",
//     type: "Gent",
//     items: [{ name: "Coat", quantity: 1, price: 1500 }],
//     advance: 1000,
//     total: 1500,
//     balance: 500,
//     isDelivered: true,
//     actualDeliveryDate: "2024-03-12",
//     customerPayment: 1500, // Example payment
//   },
//   {
//     id: 4,
//     billNo: "B004",
//     customerName: "Diana Prince",
//     teleNo: "0755443322",
//     address: "10 Lasso Rd, Amazonia",
//     orderDate: "03/11/2024",
//     service: "Ironing",
//     delivery: "Express",
//     type: "Ladies",
//     items: [{ name: "Frock", quantity: 3, price: 600 }],
//     advance: 0,
//     total: 1800,
//     balance: 1800,
//     isDelivered: false,
//     actualDeliveryDate: null,
//     customerPayment: null, // Added
//   },
// ];
// // --- End Example Orders Data ---

// export default function Delivery() {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(true);

//   // States for "Process New Delivery" section
//   const [billNoInput, setBillNoInput] = useState("");
//   const [foundOrderForCheckout, setFoundOrderForCheckout] = useState(null);
//   const [deliveryDateForCheckout, setDeliveryDateForCheckout] = useState("");
//   const [customerPayment, setCustomerPayment] = useState(""); // New state for customer payment

//   // States for Delivered Orders Table section (CRUD)
//   const [allOrders, setAllOrders] = useState(() => {
//     const savedOrders = localStorage.getItem("allOrders");
//     if (savedOrders) {
//       return JSON.parse(savedOrders);
//     } else {
//       localStorage.setItem("allOrders", JSON.stringify(EXAMPLE_ORDERS));
//       return EXAMPLE_ORDERS;
//     }
//   });

//   const [editingOrderId, setEditingOrderId] = useState(null);
//   const [editedOrderData, setEditedOrderData] = useState(null);

//   // Effect to update local storage whenever `allOrders` changes
//   useEffect(() => {
//     localStorage.setItem("allOrders", JSON.stringify(allOrders));
//   }, [allOrders]);

//   const handleBack = () => navigate("/MainPage");
//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to log out?")) {
//       localStorage.removeItem("authToken");
//       navigate("/");
//     }
//   };

//   // --- "Process New Delivery" Functions ---
//   const handleCreateCheckoutPlaceholder = () => {
//     const trimmedBillNo = billNoInput.trim();

//     if (!trimmedBillNo) {
//       toast.error("Please enter a Bill Number.");
//       setFoundOrderForCheckout(null);
//       return;
//     }

//     // Always create a new placeholder for checkout
//     const newCheckoutOrder = {
//       id: "temp-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9),
//       billNo: trimmedBillNo,
//       customerName: "Unknown Customer",
//       teleNo: "N/A",
//       address: "N/A",
//       orderDate: new Date().toLocaleDateString(),
//       service: "Not Specified",
//       delivery: "Standard",
//       type: "Mixed",
//       items: [{ name: "Generic Item", quantity: 1, price: 0 }],
//       advance: 0,
//       total: 0,
//       balance: 0,
//       isDelivered: false,
//       actualDeliveryDate: null,
//       customerPayment: null, // Initialize payment as null
//     };

//     setFoundOrderForCheckout(newCheckoutOrder);
//     setDeliveryDateForCheckout(new Date().toISOString().substring(0, 10)); // Pre-fill with current date
//     setCustomerPayment(""); // Clear previous payment
//     toast.success(`Ready to process delivery for Bill No: ${trimmedBillNo}`);
//   };

//   const handleCheckoutOrder = () => {
//     if (!foundOrderForCheckout) {
//       toast.error("No bill number entered to process.");
//       return;
//     }
//     if (!deliveryDateForCheckout) {
//       toast.error("Please select an actual delivery date.");
//       return;
//     }
//     if (customerPayment === "" || isNaN(parseFloat(customerPayment))) { // Check if payment is entered and is a number
//       toast.error("Please enter a valid customer payment.");
//       return;
//     }

//     const finalCustomerPayment = parseFloat(customerPayment);

//     const newDeliveredOrder = {
//       ...foundOrderForCheckout,
//       isDelivered: true,
//       actualDeliveryDate: deliveryDateForCheckout,
//       customerPayment: finalCustomerPayment, // Save the customer's payment
//       id: Date.now() + "-" + Math.random().toString(36).substring(2, 9),
//     };

//     setAllOrders((prevOrders) => [...prevOrders, newDeliveredOrder]);

//     setFoundOrderForCheckout(newDeliveredOrder); // Update for UI
    
//     toast.success(
//       `Bill No: ${foundOrderForCheckout.billNo} marked as delivered on ${deliveryDateForCheckout}! Payment: Rs.${finalCustomerPayment.toFixed(2)}`
//     );
    
//     // Clear form after successful checkout
//     setBillNoInput("");
//     setCustomerPayment("");
//     // setFoundOrderForCheckout(null); // Keep it visible as 'delivered' for confirmation
//   };

//   // --- Delivered Orders Table (CRUD) Functions ---

//   const deliveredOrders = allOrders.filter((order) => order.isDelivered);

//   const handleEdit = (order) => {
//     setEditingOrderId(order.id);
//     setEditedOrderData({ ...order });
//   };

//   const handleCancelEdit = () => {
//     setEditingOrderId(null);
//     setEditedOrderData(null);
//   };

//   const handleSaveEdit = () => {
//     if (
//       !editedOrderData.billNo ||
//       !editedOrderData.customerName ||
//       !editedOrderData.actualDeliveryDate ||
//       isNaN(parseFloat(editedOrderData.customerPayment))
//     ) {
//       toast.error("Bill No, Customer Name, Delivery Date, and Customer Payment are required and must be valid.");
//       return;
//     }
//     const updatedOrders = allOrders.map((order) =>
//       order.id === editedOrderData.id ? {...editedOrderData, customerPayment: parseFloat(editedOrderData.customerPayment)} : order
//     );
//     setAllOrders(updatedOrders);
//     setEditingOrderId(null);
//     setEditedOrderData(null);
//     toast.success(`Order ${editedOrderData.billNo} updated successfully!`);
//   };

//   const handleDelete = (orderId, billNo) => {
//     if (window.confirm(`Are you sure you want to delete order ${billNo}?`)) {
//       const updatedOrders = allOrders.filter((order) => order.id !== orderId);
//       setAllOrders(updatedOrders);
//       toast.success(`Order ${billNo} deleted successfully!`);
//       if (editingOrderId === orderId) {
//         setEditingOrderId(null);
//         setEditedOrderData(null);
//       }
//       if (foundOrderForCheckout && foundOrderForCheckout.id === orderId) {
//         setFoundOrderForCheckout(null);
//         setBillNoInput("");
//       }
//     }
//   };

//   const handleToggleDeliveredStatus = (orderId, currentStatus) => {
//     const updatedOrders = allOrders.map((order) =>
//       order.id === orderId
//         ? {
//             ...order,
//             isDelivered: !currentStatus,
//             actualDeliveryDate: !currentStatus ? new Date().toISOString().substring(0, 10) : null,
//             // When marking as pending, clear payment too (optional, depends on your logic)
//             // customerPayment: !currentStatus ? order.customerPayment : null,
//           }
//         : order
//     );
//     setAllOrders(updatedOrders);
//     toast.info(
//       `Order status for ${
//         allOrders.find((o) => o.id === orderId)?.billNo
//       } changed to ${!currentStatus ? "Delivered" : "Pending"}.`
//     );
//     if (foundOrderForCheckout && foundOrderForCheckout.id === orderId) {
//       setFoundOrderForCheckout(prev => ({
//         ...prev,
//         isDelivered: !currentStatus,
//         actualDeliveryDate: !currentStatus ? new Date().toISOString().substring(0, 10) : null,
//         // customerPayment: !currentStatus ? prev.customerPayment : null,
//       }));
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedOrderData((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />

//       <Sidebar
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         handleLogout={handleLogout}
//         handleBack={handleBack}
//       />

//       <div
//         className={`flex-1 p-8 transition-all duration-300 ${
//           isOpen ? "ml-64" : "ml-20"
//         }`}
//       >
//         <div className="bg-white rounded-2xl shadow-xl w-full max-w-7xl mx-auto p-8">
//           <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
//             Delivery Management Hub
//           </h1>

//           {/* --- Section 1: Process New Delivery --- */}
//           <div className="mb-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-md">
//             <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center space-x-3">
//               <Truck size={28} />
//               <span>Process New Delivery</span>
//             </h2>

//             {/* Bill Number Input */}
//             <div className="mb-6 p-6 bg-blue-100 rounded-lg shadow-inner">
//               <label
//                 htmlFor="billNo"
//                 className="block text-xl font-semibold text-blue-800 mb-3"
//               >
//                 Enter Bill Number to Process:
//               </label>
//               <div className="flex gap-4">
//                 <input
//                   type="text"
//                   id="billNo"
//                   value={billNoInput}
//                   onChange={(e) => setBillNoInput(e.target.value)}
//                   placeholder="e.g., NEW001"
//                   className="flex-1 border border-blue-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800"
//                 />
//                 <button
//                   onClick={handleCreateCheckoutPlaceholder}
//                   className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg flex items-center justify-center space-x-2"
//                 >
//                   <Search size={20} />
//                   <span>Prepare Delivery</span>
//                 </button>
//               </div>
//               <p className="text-sm text-gray-500 mt-2">
//                 Type any bill number to mark it as delivered. This will add it to the Delivered Orders List.
//               </p>
//             </div>

//             {/* Found Order Details & Checkout */}
//             {foundOrderForCheckout ? (
//               <div className="p-8 bg-white rounded-lg shadow-lg border border-indigo-200">
//                 <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center space-x-2">
//                   <ReceiptText size={24} />
//                   <span>Details for Bill No: {foundOrderForCheckout.billNo}</span>
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6 text-gray-700">
//                   <p>
//                     <strong>Customer Name:</strong>{" "}
//                     {foundOrderForCheckout.customerName}
//                   </p>
//                   <p>
//                     <strong>Contact No:</strong> {foundOrderForCheckout.teleNo}
//                   </p>
//                   <p>
//                     <strong>Address:</strong> {foundOrderForCheckout.address}
//                   </p>
//                   <p>
//                     <strong>Order Date:</strong> {foundOrderForCheckout.orderDate}
//                   </p>
//                   <p>
//                     <strong>Service:</strong> {foundOrderForCheckout.service}
//                   </p>
//                   <p>
//                     <strong>Delivery Option:</strong> {foundOrderForCheckout.delivery}
//                   </p>
//                 </div>

//                 {/* Items Section */}
//                 <div className="mb-6">
//                     <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center space-x-2">
//                         <ListOrdered size={20} />
//                         <span>Order Items (Placeholder):</span>
//                     </h4>
//                     {foundOrderForCheckout.items.length > 0 ? (
//                         <ul className="list-disc list-inside text-gray-700 ml-4">
//                             {foundOrderForCheckout.items.map((item, index) => (
//                                 <li key={index}>
//                                     {item.name} (x{item.quantity}) - Rs.{item.price * item.quantity}.00
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="italic text-gray-500">No items listed for this order.</p>
//                     )}
//                 </div>

//                 {/* Placeholder financial details (can be removed if truly not needed) */}
//                 <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6">
//                   <p className="text-xl font-semibold text-gray-800 mb-2">
//                     Placeholder Total:{" "}
//                     <span className="text-purple-700">
//                       Rs.{foundOrderForCheckout.total.toFixed(2)}
//                     </span>
//                   </p>
//                   <p className="text-lg text-gray-700 mb-2">
//                     Placeholder Advance:{" "}
//                     <span className="text-green-600">
//                       Rs.{foundOrderForCheckout.advance.toFixed(2)}
//                     </span>
//                   </p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     Placeholder Balance:{" "}
//                     <span className="text-red-600">
//                       Rs.{foundOrderForCheckout.balance.toFixed(2)}
//                     </span>
//                   </p>
//                 </div>

//                 {foundOrderForCheckout.isDelivered ? ( // This will be true AFTER checkout
//                   <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md flex items-center space-x-3 mt-8">
//                     <CheckCircle size={24} className="flex-shrink-0" />
//                     <div>
//                       <p className="font-bold text-lg">
//                         Bill No. {foundOrderForCheckout.billNo} Has Been Marked as Delivered!
//                       </p>
//                       <p>
//                         Delivered on:{" "}
//                         {foundOrderForCheckout.actualDeliveryDate || "N/A"}
//                       </p>
//                       <p>
//                         Customer Paid: Rs.
//                         {foundOrderForCheckout.customerPayment !== null
//                           ? foundOrderForCheckout.customerPayment.toFixed(2)
//                           : "N/A"}
//                       </p>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="mt-8">
//                     <label
//                       htmlFor="deliveryDateForCheckout"
//                       className="block text-lg font-medium text-gray-700 mb-2"
//                     >
//                       Actual Delivery Date:
//                     </label>
//                     <input
//                       type="date"
//                       id="deliveryDateForCheckout"
//                       value={deliveryDateForCheckout}
//                       onChange={(e) => setDeliveryDateForCheckout(e.target.value)}
//                       className="border border-gray-300 rounded-lg p-3 w-full text-lg focus:ring-2 focus:ring-indigo-400 text-gray-800 mb-4"
//                     />

//                     {/* New Customer Payment Input */}
//                     <label
//                       htmlFor="customerPayment"
//                       className="block text-lg font-medium text-gray-700 mb-2"
//                     >
//                       Customer Payment (Rs.):
//                     </label>
//                     <input
//                       type="number"
//                       id="customerPayment"
//                       value={customerPayment}
//                       onChange={(e) => setCustomerPayment(e.target.value)}
//                       placeholder="e.g., 1500.00"
//                       className="border border-gray-300 rounded-lg p-3 w-full text-lg focus:ring-2 focus:ring-indigo-400 text-gray-800 mb-6"
//                       min="0"
//                     />

//                     <button
//                       onClick={handleCheckoutOrder}
//                       disabled={!foundOrderForCheckout || !deliveryDateForCheckout || customerPayment === "" || isNaN(parseFloat(customerPayment))}
//                       className={`mt-6 w-full py-4 rounded-lg font-bold text-xl transition-all flex items-center justify-center space-x-3 ${
//                         !foundOrderForCheckout || !deliveryDateForCheckout || customerPayment === "" || isNaN(parseFloat(customerPayment))
//                           ? "bg-gray-400 text-gray-700 cursor-not-allowed"
//                           : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
//                       }`}
//                     >
//                       <CheckCircle size={24} />
//                       <span>Confirm Delivery & Checkout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="p-8 text-center text-gray-600 bg-gray-50 rounded-lg shadow-md border border-gray-200">
//                 <Loader size={48} className="mx-auto text-gray-400 mb-4 animate-pulse" />
//                 <p className="text-xl">
//                   Enter any Bill Number above and click "Prepare Delivery" to process it.
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* --- Section 2: Delivered Orders Table --- */}
//           <div className="p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
//             <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center space-x-3">
//               <CheckCircle size={28} />
//               <span>Delivered Orders List</span>
//             </h2>

//             {deliveredOrders.length === 0 ? (
//               <div className="p-8 text-center text-gray-600 bg-gray-50 rounded-lg shadow-md">
//                 <Package size={48} className="mx-auto text-gray-400 mb-4" />
//                 <p className="text-xl">No delivered orders to display yet.</p>
//                 <p className="text-md mt-2">
//                   Orders marked as 'delivered' will appear in this table.
//                 </p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-100">
//                 <table className="min-w-full bg-white border-collapse">
//                   <thead className="bg-blue-600 text-white">
//                     <tr>
//                       <th className="py-3 px-4 text-left">Bill No.</th>
//                       <th className="py-3 px-4 text-left">Customer</th>
//                       <th className="py-3 px-4 text-left">Tel. No.</th>
//                       <th className="py-3 px-4 text-left">Delivered On</th>
//                       <th className="py-3 px-4 text-left">Paid</th> {/* New Column */}
//                       <th className="py-3 px-4 text-left">Total</th>
//                       <th className="py-3 px-4 text-left">Balance</th>
//                       <th className="py-3 px-4 text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {deliveredOrders.map((order) => (
//                       <tr
//                         key={order.id}
//                         className="hover:bg-blue-50 transition-colors"
//                       >
//                         {editingOrderId === order.id ? (
//                           // --- Edit Mode Row ---
//                           <>
//                             <td className="py-3 px-4">
//                               <input
//                                 type="text"
//                                 name="billNo"
//                                 value={editedOrderData.billNo}
//                                 onChange={handleInputChange}
//                                 className="w-24 p-2 border rounded text-sm focus:ring-indigo-300"
//                               />
//                             </td>
//                             <td className="py-3 px-4">
//                               <input
//                                 type="text"
//                                 name="customerName"
//                                 value={editedOrderData.customerName}
//                                 onChange={handleInputChange}
//                                 className="w-32 p-2 border rounded text-sm focus:ring-indigo-300"
//                               />
//                             </td>
//                             <td className="py-3 px-4">
//                               <input
//                                 type="text"
//                                 name="teleNo"
//                                 value={editedOrderData.teleNo}
//                                 onChange={handleInputChange}
//                                 className="w-28 p-2 border rounded text-sm focus:ring-indigo-300"
//                               />
//                             </td>
//                             <td className="py-3 px-4">
//                               <input
//                                 type="date"
//                                 name="actualDeliveryDate"
//                                 value={editedOrderData.actualDeliveryDate || ""}
//                                 onChange={handleInputChange}
//                                 className="w-32 p-2 border rounded text-sm focus:ring-indigo-300"
//                               />
//                             </td>
//                             {/* New Customer Payment Input in Edit Mode */}
//                             <td className="py-3 px-4">
//                               <input
//                                 type="number"
//                                 name="customerPayment"
//                                 value={editedOrderData.customerPayment || ''}
//                                 onChange={handleInputChange}
//                                 className="w-24 p-2 border rounded text-sm focus:ring-indigo-300"
//                                 min="0"
//                               />
//                             </td>
//                             <td className="py-3 px-4">
//                               Rs.{editedOrderData.total.toFixed(2)}
//                             </td>
//                             <td className="py-3 px-4">
//                               Rs.{editedOrderData.balance.toFixed(2)}
//                             </td>
//                             <td className="py-3 px-4 flex justify-center space-x-2">
//                               <button
//                                 onClick={handleSaveEdit}
//                                 className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition"
//                                 title="Save Changes"
//                               >
//                                 <Save size={18} />
//                               </button>
//                               <button
//                                 onClick={handleCancelEdit}
//                                 className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md transition"
//                                 title="Cancel Edit"
//                               >
//                                 <XCircle size={18} />
//                               </button>
//                             </td>
//                           </>
//                         ) : (
//                           // --- View Mode Row ---
//                           <>
//                             <td className="py-3 px-4 font-semibold text-blue-700">
//                               {order.billNo}
//                             </td>
//                             <td className="py-3 px-4">{order.customerName}</td>
//                             <td className="py-3 px-4">{order.teleNo}</td>
//                             <td className="py-3 px-4">
//                               {order.actualDeliveryDate || "N/A"}
//                             </td>
//                             {/* Display Customer Payment */}
//                             <td className="py-3 px-4">
//                               Rs.
//                               {order.customerPayment !== null
//                                 ? order.customerPayment.toFixed(2)
//                                 : "0.00"}
//                             </td>
//                             <td className="py-3 px-4">
//                               Rs.{order.total.toFixed(2)}
//                             </td>
//                             <td className="py-3 px-4">
//                               Rs.{order.balance.toFixed(2)}
//                             </td>
//                             <td className="py-3 px-4 flex justify-center space-x-2">
//                               <button
//                                 onClick={() => handleEdit(order)}
//                                 className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md transition"
//                                 title="Edit Order"
//                               >
//                                 <Pencil size={18} />
//                               </button>
//                               <button
//                                 onClick={() =>
//                                   handleDelete(order.id, order.billNo)
//                                 }
//                                 className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition"
//                                 title="Delete Order"
//                               >
//                                 <Trash2 size={18} />
//                               </button>
//                               <button
//                                 onClick={() =>
//                                   handleToggleDeliveredStatus(order.id, order.isDelivered)
//                                 }
//                                 className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-md transition"
//                                 title="Mark as Pending"
//                               >
//                                 <RefreshCcw size={18} />
//                               </button>
//                             </td>
//                           </>
//                         )}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/Delivery.jsx - The "Delivery Management Hub"
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Search,
  CheckCircle,
  Package,
  Truck,
  ReceiptText,
  Pencil,
  Trash2,
  XCircle,
  Save,
  RefreshCcw,
  ListOrdered,
  Loader,
  DollarSign,
  LogOut,
  Menu,
  Home,
  ShoppingCart,
  X,
  LayoutDashboard, // Added for Sidebar
  Shirt, // Added for Sidebar
  ClipboardList, // Added for Sidebar
} from "lucide-react";
import axios from "axios";
// Removed react-toastify, using alert() instead

// Define your backend's URL
const API_URL = "http://localhost:8080/api";

// --- SIDEBAR COMPONENT IS NOW EMBEDDED ---
const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
        navigate("/");
      }
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 ${
        isOpen ? "w-64" : "w-20"
      } bg-blue-700 text-white transition-all duration-300 shadow-lg flex flex-col justify-between z-50`}
    >
      <div>
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

// Helper to format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  // Parse YYYY-MM-DD
  const parts = dateString.split("-");
  if (parts.length === 3) {
    return new Date(parts[0], parts[1] - 1, parts[2]).toLocaleDateString();
  }
  return new Date(dateString).toLocaleDateString();
};

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


export default function Delivery() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  // States for "Process New Delivery" section
  const [billNoInput, setBillNoInput] = useState("");
  const [foundOrderForCheckout, setFoundOrderForCheckout] = useState(null);
  const [deliveryDateForCheckout, setDeliveryDateForCheckout] = useState("");
  const [customerPayment, setCustomerPayment] = useState("");

  // States for Delivered Orders Table section (CRUD)
  const [allOrders, setAllOrders] = useState([]); // Will be fetched from backend
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrderData, setEditedOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- CONNECTED: Fetch all orders on load ---
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/orders`, {
        withCredentials: true,
      });
      setAllOrders(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please log in.");
        navigate("/");
      } else {
        console.error("Error fetching orders:", err);
        alert("Error fetching orders.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOrders(); // Fetch on initial load
  }, [navigate]);

  // --- "Process New Delivery" Functions ---

  // --- REWRITTEN: Find a real order ---
  const handleFindOrder = () => {
    const trimmedBillNo = billNoInput.trim();
    if (!trimmedBillNo) {
      alert("Please enter a Bill Number.");
      return;
    }

    const order = allOrders.find((o) => o.BillNo === trimmedBillNo);

    if (!order) {
      alert(`Order with Bill No: ${trimmedBillNo} not found.`);
      setFoundOrderForCheckout(null);
    } else if (order.isDelivered) {
      alert(`Order ${trimmedBillNo} has already been delivered.`);
      setFoundOrderForCheckout(order); // Show it, but disable checkout
    } else {
      // Order found and is pending!
      setFoundOrderForCheckout(order);
      setDeliveryDateForCheckout(new Date().toISOString().substring(0, 10)); // Pre-fill date
      setCustomerPayment(order.Balance.toString()); // Pre-fill payment with balance
      alert(`Order ${trimmedBillNo} found. Ready for checkout.`);
    }
  };

  // --- CONNECTED: Mark order as delivered ---
  const handleCheckoutOrder = async () => {
    if (!foundOrderForCheckout) return;
    if (!deliveryDateForCheckout) {
      alert("Please select an actual delivery date.");
      return;
    }
    if (customerPayment === "" || isNaN(parseFloat(customerPayment))) {
      alert("Please enter a valid customer payment.");
      return;
    }

    const finalCustomerPayment = parseFloat(customerPayment);
    const updatedOrder = {
      ...foundOrderForCheckout,
      isDelivered: true,
      actualDeliveryDate: deliveryDateForCheckout,
      customerPayment: finalCustomerPayment,
    };

    try {
      await axios.put(
        `${API_URL}/orders/${foundOrderForCheckout.BillNo}`,
        updatedOrder,
        { withCredentials: true }
      );

      // Update the order in the local state
      setAllOrders((prev) =>
        prev.map((o) =>
          o.BillNo === updatedOrder.BillNo ? updatedOrder : o
        )
      );
      
      setFoundOrderForCheckout(updatedOrder); // Update UI to show "Delivered"
      alert(
        `Order ${foundOrderForCheckout.BillNo} marked as delivered! Payment: Rs.${finalCustomerPayment.toFixed(2)}`
      );
      
      // Clear form
      setBillNoInput("");
      setCustomerPayment("");
      // Keep foundOrderForCheckout visible for confirmation
    } catch (err) {
      console.error("Error checking out order:", err);
      alert("Error checking out order.");
    }
  };

  // --- Delivered Orders Table (CRUD) Functions ---

  const deliveredOrders = allOrders.filter((order) => order.isDelivered);

  const handleEdit = (order) => {
    setEditingOrderId(order.BillNo); // Use BillNo as ID
    setEditedOrderData({ 
      ...order, 
      // Ensure date is in YYYY-MM-DD format for the input
      actualDeliveryDate: formatDateToYYYYMMDD(new Date(order.actualDeliveryDate))
    });
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setEditedOrderData(null);
  };

  // --- CONNECTED: Save edits to a delivered order ---
  const handleSaveEdit = async () => {
    if (
      !editedOrderData.BillNo ||
      !editedOrderData.CustomerName ||
      !editedOrderData.actualDeliveryDate ||
      isNaN(parseFloat(editedOrderData.customerPayment))
    ) {
      alert("Bill No, Customer Name, Delivery Date, and Customer Payment are required.");
      return;
    }
    
    const updatedData = {
      ...editedOrderData,
      customerPayment: parseFloat(editedOrderData.customerPayment)
    };

    try {
      await axios.put(
        `${API_URL}/orders/${editedOrderData.BillNo}`,
        updatedData,
        { withCredentials: true }
      );
      
      setAllOrders((prev) =>
        prev.map((o) => (o.BillNo === updatedData.BillNo ? updatedData : o))
      );
      
      setEditingOrderId(null);
      setEditedOrderData(null);
      alert(`Order ${updatedData.BillNo} updated successfully!`);

    } catch(err) {
      console.error("Error updating order:", err);
      alert("Error updating order.");
    }
  };

  // --- CONNECTED: Delete an order ---
  const handleDelete = async (order) => {
    if (window.confirm(`Are you sure you want to delete order ${order.BillNo}?`)) {
      try {
        await axios.delete(`${API_URL}/orders/${order.BillNo}`, { withCredentials: true });

        setAllOrders((prev) => prev.filter((o) => o.BillNo !== order.BillNo));
        alert(`Order ${order.BillNo} deleted successfully!`);
        
        if (editingOrderId === order.BillNo) {
          setEditingOrderId(null);
          setEditedOrderData(null);
        }
        if (foundOrderForCheckout && foundOrderForCheckout.BillNo === order.BillNo) {
          setFoundOrderForCheckout(null);
          setBillNoInput("");
        }
      } catch(err) {
        console.error("Error deleting order:", err);
        alert("Error deleting order.");
      }
    }
  };

  // --- CONNECTED: Mark an order as "Pending" ---
  const handleToggleDeliveredStatus = async (order, currentStatus) => {
    const newStatus = !currentStatus;
    const updatedOrder = {
      ...order,
      isDelivered: newStatus,
      actualDeliveryDate: newStatus ? new Date().toISOString().substring(0, 10) : null,
      // Clear payment if marking as pending
      customerPayment: newStatus ? order.customerPayment : null, 
    };

    try {
      await axios.put(
        `${API_URL}/orders/${order.BillNo}`,
        updatedOrder,
        { withCredentials: true }
      );

      setAllOrders((prev) =>
        prev.map((o) => (o.BillNo === order.BillNo ? updatedOrder : o))
      );
      
      alert(
        `Order ${order.BillNo} changed to ${newStatus ? "Delivered" : "Pending"}.`
      );

      // If this was the order in the checkout box, update it there too
      if (foundOrderForCheckout && foundOrderForCheckout.BillNo === order.BillNo) {
        setFoundOrderForCheckout(updatedOrder);
      }
    } catch(err) {
       console.error("Error updating status:", err);
       alert("Error updating status.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOrderData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // handleLogout is defined in the embedded Sidebar
      />

      <div
        className={`flex-1 p-8 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-7xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
            Delivery Management Hub
          </h1>

          {/* --- Section 1: Process New Delivery --- */}
          <div className="mb-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center space-x-3">
              <Truck size={28} />
              <span>Process Pending Order</span>
            </h2>

            {/* Bill Number Input */}
            <div className="mb-6 p-6 bg-blue-100 rounded-lg shadow-inner">
              <label
                htmlFor="billNo"
                className="block text-xl font-semibold text-blue-800 mb-3"
              >
                Find Order by Bill Number:
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  id="billNo"
                  value={billNoInput}
                  onChange={(e) => setBillNoInput(e.target.value)}
                  placeholder="e.g., B-167..."
                  className="flex-1 border border-blue-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800"
                />
                <button
                  onClick={handleFindOrder}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <Search size={20} />
                  <span>Find Order</span>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Find a pending order to mark it as delivered and record payment.
              </p>
            </div>

            {/* Found Order Details & Checkout */}
            {foundOrderForCheckout ? (
              <div className="p-8 bg-white rounded-lg shadow-lg border border-indigo-200">
                <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center space-x-2">
                  <ReceiptText size={24} />
                  <span>Details for Bill No: {foundOrderForCheckout.BillNo}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6 text-gray-700">
                  <p>
                    <strong>Customer Name:</strong>{" "}
                    {foundOrderForCheckout.CustomerName}
                  </p>
                  <p>
                    <strong>Contact No:</strong> {foundOrderForCheckout.Telephone}
                  </p>
                  <p className="md:col-span-2">
                    <strong>Address:</strong> {foundOrderForCheckout.Address}
                  </p>
                  <p>
                    <strong>Order Date:</strong> {formatDate(foundOrderForCheckout.Date)}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                    <ListOrdered size={20} />
                    <span>Order Items:</span>
                  </h4>
                  {foundOrderForCheckout.Items.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      {foundOrderForCheckout.Items.map((item, index) => (
                        <li key={index}>
                          {item.item} ({item.service}) (x{item.quantity}) - Rs.
                          {item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="italic text-gray-500">
                      No items listed for this order.
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6">
                  <p className="text-xl font-semibold text-gray-800 mb-2">
                    Total Order Value:{" "}
                    <span className="text-purple-700">
                      Rs.{(foundOrderForCheckout.Advance + foundOrderForCheckout.Balance).toFixed(2)}
                    </span>
                  </p>
                  <p className="text-lg text-gray-700 mb-2">
                    Advance Paid:{" "}
                    <span className="text-green-600">
                      Rs.{foundOrderForCheckout.Advance.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    Balance Due:{" "}
                    <span className="text-red-600">
                      Rs.{foundOrderForCheckout.Balance.toFixed(2)}
                    </span>
                  </p>
                </div>

                {foundOrderForCheckout.isDelivered ? (
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md flex items-center space-x-3 mt-8">
                    <CheckCircle size={24} className="flex-shrink-0" />
                    <div>
                      <p className="font-bold text-lg">
                        Order Has Been Marked as Delivered!
                      </p>
                      <p>
                        Delivered on:{" "}
                        {formatDate(foundOrderForCheckout.actualDeliveryDate) || "N/A"}
                      </p>
                      <p>
                        Customer Paid: Rs.
                        {foundOrderForCheckout.customerPayment !== null
                          ? foundOrderForCheckout.customerPayment.toFixed(2)
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8">
                    <label
                      htmlFor="deliveryDateForCheckout"
                      className="block text-lg font-medium text-gray-700 mb-2"
                    >
                      Actual Delivery Date:
                    </label>
                    <input
                      type="date"
                      id="deliveryDateForCheckout"
                      value={deliveryDateForCheckout}
                      onChange={(e) =>
                        setDeliveryDateForCheckout(e.target.value)
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full text-lg focus:ring-2 focus:ring-indigo-400 text-gray-800 mb-4"
                    />

                    <label
                      htmlFor="customerPayment"
                      className="block text-lg font-medium text-gray-700 mb-2"
                    >
                      Customer Payment (Rs.):
                    </label>
                    <input
                      type="number"
                      id="customerPayment"
                      value={customerPayment}
                      onChange={(e) => setCustomerPayment(e.target.value)}
                      placeholder="e.g., 1500.00"
                      className="border border-gray-300 rounded-lg p-3 w-full text-lg focus:ring-2 focus:ring-indigo-400 text-gray-800 mb-6"
                      min="0"
                    />

                    <button
                      onClick={handleCheckoutOrder}
                      disabled={!deliveryDateForCheckout || customerPayment === ""}
                      className={`mt-6 w-full py-4 rounded-lg font-bold text-xl transition-all flex items-center justify-center space-x-3 ${
                        !deliveryDateForCheckout || customerPayment === ""
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
                      }`}
                    >
                      <CheckCircle size={24} />
                      <span>Confirm Delivery & Checkout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-600 bg-gray-50 rounded-lg shadow-md border border-gray-200">
                <Loader
                  size={48}
                  className="mx-auto text-gray-400 mb-4 animate-spin"
                />
                <p className="text-xl">
                  Enter a Bill Number to find a pending order.
                </p>
              </div>
            )}
          </div>

          {/* --- Section 2: Delivered Orders Table --- */}
          <div className="p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center space-x-3">
              <CheckCircle size={28} />
              <span>Delivered Orders List</span>
            </h2>

            {loading ? (
                <p className="text-gray-600 text-center py-4">Loading delivered orders...</p>
            ) : deliveredOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-600 bg-gray-50 rounded-lg shadow-md">
                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-xl">No delivered orders to display yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-100">
                <table className="min-w-full bg-white border-collapse">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">Bill No.</th>
                      <th className="py-3 px-4 text-left">Customer</th>
                      <th className="py-3 px-4 text-left">Tel. No.</th>
                      <th className="py-3 px-4 text-left">Delivered On</th>
                      <th className="py-3 px-4 text-left">Paid</th>
                      <th className="py-3 px-4 text-left">Total</th>
                      <th className="py-3 px-4 text-left">Balance</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {deliveredOrders.map((order) => (
                      <tr
                        key={order.BillNo}
                        className="hover:bg-blue-50 transition-colors"
                      >
                        {editingOrderId === order.BillNo ? (
                          // --- Edit Mode Row ---
                          <>
                            <td className="py-3 px-4">
                              <input
                                type="text"
                                name="BillNo"
                                value={editedOrderData.BillNo}
                                readOnly
                                className="w-28 p-2 border rounded text-sm bg-gray-100 cursor-not-allowed"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="text"
                                name="CustomerName"
                                value={editedOrderData.CustomerName}
                                onChange={handleInputChange}
                                className="w-32 p-2 border rounded text-sm focus:ring-indigo-300"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="text"
                                name="Telephone"
                                value={editedOrderData.Telephone}
                                onChange={handleInputChange}
                                className="w-28 p-2 border rounded text-sm focus:ring-indigo-300"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="date"
                                name="actualDeliveryDate"
                                value={editedOrderData.actualDeliveryDate || ""}
                                onChange={handleInputChange}
                                className="w-32 p-2 border rounded text-sm focus:ring-indigo-300"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="number"
                                name="customerPayment"
                                value={editedOrderData.customerPayment || ""}
                                onChange={handleInputChange}
                                className="w-24 p-2 border rounded text-sm focus:ring-indigo-300"
                                min="0"
                              />
                            </td>
                            <td className="py-3 px-4">
                              Rs.{(editedOrderData.Advance + editedOrderData.Balance).toFixed(2)}
                            </td>
                            <td className="py-3 px-4">
                              Rs.{editedOrderData.Balance.toFixed(2)}
                            </td>
                            <td className="py-3 px-4 flex justify-center space-x-2">
                              <button
                                onClick={handleSaveEdit}
                                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition"
                                title="Save Changes"
                              >
                                <Save size={18} />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md transition"
                                title="Cancel Edit"
                              >
                                <XCircle size={18} />
                              </button>
                            </td>
                          </>
                        ) : (
                          // --- View Mode Row ---
                          <>
                            <td className="py-3 px-4 font-semibold text-blue-700">
                              {order.BillNo}
                            </td>
                            <td className="py-3 px-4">{order.CustomerName}</td>
                            <td className="py-3 px-4">{order.Telephone}</td>
                            <td className="py-3 px-4">
                              {formatDate(order.actualDeliveryDate) || "N/A"}
                            </td>
                            <td className="py-3 px-4">
                              Rs.
                              {order.customerPayment !== null
                                ? order.customerPayment.toFixed(2)
                                : "0.00"}
                            </td>
                            <td className="py-3 px-4">
                              Rs.{(order.Advance + order.Balance).toFixed(2)}
                            </td>
                            <td className="py-3 px-4">
                              Rs.{order.Balance.toFixed(2)}
                            </td>
                            <td className="py-3 px-4 flex justify-center space-x-2">
                              <button
                                onClick={() => handleEdit(order)}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md transition"
                                title="Edit Order"
                              >
                                <Pencil size={18} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDelete(order) // Pass the whole order
                                }
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition"
                                title="Delete Order"
                              >
                                <Trash2 size={18} />
                              </button>
                              <button
                                onClick={() =>
                                  handleToggleDeliveredStatus(order, order.isDelivered)
                                }
                                className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-md transition"
                                title="Mark as Pending"
                              >
                                <RefreshCcw size={18} />
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}