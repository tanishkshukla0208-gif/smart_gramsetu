import { useState } from "react";
import { Link } from "react-router";
import { useApp } from "../context/AppContext.jsx";

// Simple reusable input component
function Input({ label, name, type = "text", value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 sm:text-sm"
      />
    </div>
  );
}

// Simple reusable select component
function Select({ label, name, options, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 sm:text-sm"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function AccountSettings() {
  const { /* user data could be injected via context */ } = useApp();

  // Tab navigation
  const tabs = [
    "Personal Information",
    "Location & Demographics",
    "Socio‑Economic & Category",
    "Notification Preferences",
    "Security",
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Form state (placeholder values)
  const [form, setForm] = useState({
    // Personal
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    dob: "1990-01-01",
    gender: "Male",
    // Location
    state: "Karnataka",
    district: "Bangalore",
    block: "Bangalore South",
    areaType: "Urban",
    pincode: "560001",
    // Socio‑Economic
    category: "General",
    incomeBracket: "> 5 Lakh",
    occupation: "Self‑Employed",
    disability: "No",
    // Notifications
    smsAlerts: true,
    emailAlerts: true,
    whatsappAlerts: false,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    // In a real app, submit to backend here.
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <section className="page-width py-8">
      <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>
      {/* Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-2" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                activeTab === tab
                  ? "bg-mint-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Panels */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === "Personal Information" && (
          <div>
            <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
            <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
            <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            <Input label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} />
            <Input label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} />
            <Select
              label="Gender"
              name="gender"
              options={["Male", "Female", "Other"]}
              value={form.gender}
              onChange={handleChange}
            />
          </div>
        )}

        {activeTab === "Location & Demographics" && (
          <div>
            <Input label="State / UT" name="state" value={form.state} onChange={handleChange} />
            <Input label="District" name="district" value={form.district} onChange={handleChange} />
            <Input label="Block / Tehsil" name="block" value={form.block} onChange={handleChange} />
            <Select
              label="Area Type"
              name="areaType"
              options={["Rural", "Urban"]}
              value={form.areaType}
              onChange={handleChange}
            />
            <Input label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} />
          </div>
        )}

        {activeTab === "Socio‑Economic & Category" && (
          <div>
            <Select
              label="Category"
              name="category"
              options={["General", "OBC", "SC", "ST"]}
              value={form.category}
              onChange={handleChange}
            />
            <Select
              label="Annual Family Income"
              name="incomeBracket"
              options={["< 1 Lakh", "1‑3 Lakh", "3‑5 Lakh", "> 5 Lakh"]}
              value={form.incomeBracket}
              onChange={handleChange}
            />
            <Select
              label="Occupation"
              name="occupation"
              options={["Farmer", "Daily Wage", "Student", "Self‑Employed", "Other"]}
              value={form.occupation}
              onChange={handleChange}
            />
            <Select
              label="Disability Status"
              name="disability"
              options={["Yes", "No"]}
              value={form.disability}
              onChange={handleChange}
            />
          </div>
        )}

        {activeTab === "Notification Preferences" && (
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="smsAlerts"
                checked={form.smsAlerts}
                onChange={handleChange}
                className="h-4 w-4 text-mint-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">SMS alerts for new schemes</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="emailAlerts"
                checked={form.emailAlerts}
                onChange={handleChange}
                className="h-4 w-4 text-mint-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Email alerts for new schemes</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="whatsappAlerts"
                checked={form.whatsappAlerts}
                onChange={handleChange}
                className="h-4 w-4 text-mint-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">WhatsApp notifications</span>
            </label>
          </div>
        )}

        {activeTab === "Security" && (
          <div className="space-y-4">
            <button
              type="button"
              className="px-4 py-2 bg-mint-600 text-white rounded hover:bg-mint-700 transition"
            >
              Change Password
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              Manage Connected Accounts
            </button>
          </div>
        )}
      </div>

      {/* Save button */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2 bg-mint-600 text-white rounded hover:bg-mint-700 transition"
        >
          Save Changes
        </button>
      </div>

      {/* Simple toast */}
      {saved && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-mint-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
          Settings saved successfully!
        </div>
      )}
    </section>
  );
}

// Fade‑in‑out animation (Tailwind utilities extended via inline style)
<style jsx>{`
  @keyframes fade-in-out {
    0% { opacity: 0; transform: translateY(20px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-20px); }
  }
  .animate-fade-in-out { animation: fade-in-out 3s forwards; }
`}</style>
