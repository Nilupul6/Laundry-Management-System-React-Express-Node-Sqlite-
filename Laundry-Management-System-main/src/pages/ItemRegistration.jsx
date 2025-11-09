// src/pages/ItemRegistration.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Edit,
  Trash2,
  Save,
  XCircle,
  LogOut,
  Menu,
  Home,
  ShoppingCart,
  Truck,
  X,
  Plus,
  LayoutDashboard, // Added for Sidebar
  Shirt, // Added for Sidebar
  ClipboardList, // Added for Sidebar
} from "lucide-react";
import axios from "axios";

// Define your backend's URL
const API_URL = "http://localhost:8080/api";

// --- SIDEBAR COMPONENT IS NOW EMBEDDED ---
// This component is added here to resolve the import error.
const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation(); // To highlight active sidebar link
  const navigate = useNavigate(); // To redirect on logout

  // --- CONNECTED LOGOUT ---
  // This function now calls your backend to destroy the session
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

// --- UPDATED Form State (9 columns) ---
const EMPTY_FORM_STATE = {
  Items: "",
  WashAndDry: "",
  After5Days: "",
  After3Days: "",
  AfterOneDay: "",
  DryExpress: "",
  Ironing: "",
  PressingExpress: "",
  PressingNormal: "",
};

// Moved the FormInput component OUTSIDE
const FormInput = React.memo(({ label, name, value, onChange }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <input
      type={name === "Items" ? "text" : "number"}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={name === "Items" ? "e.g., T-Shirt" : "0.00"}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
      required={name === "Items"}
    />
  </div>
));

export default function ItemRegistration() {
  const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState("Gents");
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM_STATE);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/items/${type.toLowerCase()}`, {
        withCredentials: true,
      });
      setItems(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please log in.");
        navigate("/");
      } else {
        console.error("Error fetching items:", err);
        alert("Error fetching items.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [type, navigate]);
  
  // Note: handleLogout is now defined inside Sidebar.jsx
  // const handleBack = () => navigate("/MainPage"); // This is also handled by Sidebar

  const openAddNewModal = () => {
    setEditingItem(null);
    setFormData(EMPTY_FORM_STATE);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    const stringData = {};
    // Ensure all 9 keys are present
    for (const key in EMPTY_FORM_STATE) {
      // Use logical OR to fallback to empty string if value is null
      stringData[key] = String(item[key] || ""); 
    }
    stringData.id = item.id; // Keep the id
    setFormData(stringData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData(EMPTY_FORM_STATE);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- UPDATED Handle Submit (9 columns) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Items) {
      alert("Item Name is required.");
      return;
    }

    // Parse all fields into numbers before sending
    const dataToSend = {
      Items: formData.Items,
      WashAndDry: parseFloat(formData.WashAndDry) || 0,
      After5Days: parseFloat(formData.After5Days) || 0,
      After3Days: parseFloat(formData.After3Days) || 0,
      AfterOneDay: parseFloat(formData.AfterOneDay) || 0,
      DryExpress: parseFloat(formData.DryExpress) || 0,
      Ironing: parseFloat(formData.Ironing) || 0,
      PressingExpress: parseFloat(formData.PressingExpress) || 0,
      PressingNormal: parseFloat(formData.PressingNormal) || 0,
    };

    try {
      if (editingItem) {
        // --- UPDATE ---
        await axios.put(
          `${API_URL}/items/${type.toLowerCase()}/${editingItem.id}`,
          dataToSend,
          { withCredentials: true }
        );
        alert("Item updated successfully!");
      } else {
        // --- CREATE ---
        await axios.post(
          `${API_URL}/items/${type.toLowerCase()}`,
          dataToSend,
          { withCredentials: true }
        );
        alert("Item added successfully!");
      }

      closeModal();
      await fetchItems(); // Refresh the list
    } catch (err) {
      console.error("Error saving item:", err);
      alert(err.response?.data?.message || "Error saving item.");
    }
  };

  const handleDelete = async (item) => {
    if (
      window.confirm(`Are you sure you want to delete "${item.Items}"?`)
    ) {
      try {
        await axios.delete(
          `${API_URL}/items/${type.toLowerCase()}/${item.id}`,
          { withCredentials: true }
        );
        alert("Item deleted successfully!");
        await fetchItems(); // Refresh the list
      } catch (err) {
        console.error("Error deleting item:", err);
        alert(err.response?.data?.message || "Error deleting item.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* This now uses the Sidebar component defined above. */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 p-8 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-blue-800 text-center mb-10">
            Item Price List Management
          </h2>

          {/* Type Toggle */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-1 bg-blue-100 p-1 rounded-lg">
              <button
                onClick={() => setType("Gents")}
                className={`py-2 px-6 rounded-md font-semibold transition-colors ${
                  type === "Gents"
                    ? "bg-blue-600 text-white shadow"
                    : "text-blue-800 hover:bg-blue-200"
                }`}
              >
                Gents
              </button>
              <button
                onClick={() => setType("Ladies")}
                className={`py-2 px-6 rounded-md font-semibold transition-colors ${
                  type === "Ladies"
                    ? "bg-pink-600 text-white shadow"
                    : "text-pink-800 hover:bg-pink-200"
                }`}
              >
                Ladies
              </button>
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-white shadow-xl rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-700">
                {type} Items
              </h3>
              <button
                onClick={openAddNewModal}
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Add New Item</span>
              </button>
            </div>

            {loading ? (
              <p className="text-gray-600 text-center py-4">Loading items...</p>
            ) : items.length === 0 ? (
              <p className="text-gray-600 text-center py-4">
                No items found for {type}.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  {/* --- UPDATED Table Header (9 columns) --- */}
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-blue-800 uppercase">Item Name</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-blue-800 uppercase">Wash&Dry</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-blue-800 uppercase">5 Days</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-blue-800 uppercase">3 Days</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-blue-800 uppercase">1 Day</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-blue-800 uppercase">Dry Express</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-blue-800 uppercase">Ironing</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-blue-800 uppercase">Press Express</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-blue-800 uppercase">Press Normal</th>
                      <th className="py-3 px-4 text-center text-xs font-semibold text-blue-800 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* --- UPDATED Table Body (9 columns) --- */}
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-800 border-b font-medium">{item.Items}</td>
                        <td className="py-3 px-4 text-sm text-gray-500 border-b">{item.WashAndDry}</td>
                        <td className="py-3 px-4 text-sm text-gray-500 border-b">{item.After5Days}</td>
                        <td className="py-3 px-4 text-sm text-gray-500 border-b">{item.After3Days}</td>
                        <td className="py-3 px-4 text-sm text-gray-500 border-b">{item.AfterOneDay}</td>
                        <td className="py-3 px-4 text-sm text-gray-500 border-b">{item.DryExpress}</td>
                        <td className="py-3 px-4 text-sm text-gray-500 border-b">{item.Ironing}</td>
                        <td className="py-3 px-4 text-sm text-gray-500 border-b">{item.PressingExpress}</td>
                        <td className="py-3 px-4 text-sm text-gray-500 border-b">{item.PressingNormal}</td>
                        <td className="py-3 px-4 text-center text-sm border-b space-x-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100"
                            title="Edit Item"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100"
                            title="Delete Item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- UPDATED Modal Form (9 columns) --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold text-blue-700">
                {editingItem ? "Edit Item" : "Add New Item"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <FormInput
                    label="Item Name"
                    name="Items"
                    value={formData.Items}
                    onChange={handleFormChange}
                  />
                </div>
                
                {/* All 9 Price Inputs */}
                <FormInput
                  label="Wash & Dry"
                  name="WashAndDry"
                  value={formData.WashAndDry}
                  onChange={handleFormChange}
                />
                <FormInput
                  label="After 5 Days"
                  name="After5Days"
                  value={formData.After5Days}
                  onChange={handleFormChange}
                />
                <FormInput
                  label="After 3 Days"
                  name="After3Days"
                  value={formData.After3Days}
                  onChange={handleFormChange}
                />
                <FormInput
                  label="After 1 Day"
                  name="AfterOneDay"
                  value={formData.AfterOneDay}
                  onChange={handleFormChange}
                />
                <FormInput
                  label="Dry Express"
                  name="DryExpress"
                  value={formData.DryExpress}
                  onChange={handleFormChange}
                />
                <FormInput
                  label="Ironing"
                  name="Ironing"
                  value={formData.Ironing}
                  onChange={handleFormChange}
                />
                <FormInput
                  label="Pressing Express"
                  name="PressingExpress"
                  value={formData.PressingExpress}
                  onChange={handleFormChange}
                />
                <FormInput
                  label="Pressing Normal"
                  name="PressingNormal"
                  value={formData.PressingNormal}
                  onChange={handleFormChange}
                />
              </div>
              
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700"
                >
                  {editingItem ? "Update Item" : "Save Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}