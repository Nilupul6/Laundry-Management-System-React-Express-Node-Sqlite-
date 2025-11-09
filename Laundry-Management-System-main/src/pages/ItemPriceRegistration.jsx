
// src/pages/ItemRegistration.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";
import axios from "axios";

// Define your backend's URL
const API_URL = "http://localhost:8080/api";

// --- PLACEHOLDER SIDEBAR COMPONENT ---
// This component is added here to resolve the import error.
const Sidebar = ({ isOpen, setIsOpen, handleLogout }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-blue-800 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } shadow-lg z-50`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 h-16 border-b border-blue-700">
          <h1
            className={`text-xl font-bold transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Laundry
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-blue-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className="flex-1 py-4 space-y-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/dashboard"); // Assuming this is your main page
            }}
            className="flex items-center p-4 hover:bg-blue-700"
          >
            <Home size={24} />
            <span
              className={`ml-4 transition-opacity ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Dashboard
            </span>
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/Order");
            }}
            className="flex items-center p-4 hover:bg-blue-700"
          >
            <ShoppingCart size={24} />
            <span
              className={`ml-4 transition-opacity ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Orders
            </span>
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/OrderDelivery");
            }}
            className="flex items-center p-4 hover:bg-blue-700"
          >
            <Truck size={24} />
            <span
              className={`ml-4 transition-opacity ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Deliveries
            </span>
          </a>
        </nav>
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-4 rounded-lg hover:bg-blue-700"
          >
            <LogOut size={24} />
            <span
              className={`ml-4 transition-opacity ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
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

export default function ItemPriceRegistration() {
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

  const handleBack = () => navigate("/MainPage");

  const openAddNewModal = () => {
    setEditingItem(null);
    setFormData(EMPTY_FORM_STATE);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    const stringData = {};
    for (const key in item) {
      stringData[key] = item[key] !== null ? String(item[key]) : "";
    }
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
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleLogout={handleLogout}
        handleBack={handleBack}
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
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-7Gents"
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