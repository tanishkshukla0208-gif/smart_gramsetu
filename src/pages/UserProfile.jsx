import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useApp } from "../context/AppContext.jsx";
import { ChevronDown } from "lucide-react";

function Badge({ children }) {
  return (
    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2">
      {children}
    </span>
  );
}

export default function UserProfile() {
  const { /* add user data from context if available */ } = useApp();

  const [user, setUser] = useState({
    avatar: null,
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    state: "Karnataka",
    district: "Bangalore",
    language: "English",
    verified: true,
    savedSchemes: 12,
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUser((prev) => ({ ...prev, avatar: ev.target.result }));
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="page-width py-8">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        {/* Header with avatar, name and badge */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                Avatar
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer shadow"
              title="Change avatar">
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <ChevronDown size={16} className="text-gray-600" />
            </label>
          </div>
          <div>
            <h2 className="text-xl font-medium flex items-center">
              {user.fullName}
              {user.verified && <Badge>Verified Citizen</Badge>}
            </h2>
          </div>
        </div>
        {/* Details grid */}
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div className="flex">
            <dt className="w-40 font-medium text-gray-500">Full Name</dt>
            <dd className="ml-2">{user.fullName}</dd>
          </div>
          <div className="flex">
            <dt className="w-40 font-medium text-gray-500">Email Address</dt>
            <dd className="ml-2">{user.email}</dd>
          </div>
          <div className="flex">
            <dt className="w-40 font-medium text-gray-500">Phone Number</dt>
            <dd className="ml-2">{user.phone}</dd>
          </div>
          <div className="flex">
            <dt className="w-40 font-medium text-gray-500">State / UT</dt>
            <dd className="ml-2">{user.state}</dd>
          </div>
          <div className="flex">
            <dt className="w-40 font-medium text-gray-500">District</dt>
            <dd className="ml-2">{user.district}</dd>
          </div>
          <div className="flex">
            <dt className="w-40 font-medium text-gray-500">Primary Language</dt>
            <dd className="ml-2">{user.language}</dd>
          </div>
        </dl>
        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Link
            to="/account/settings"
            className="px-4 py-2 bg-mint-600 text-white rounded-xl hover:bg-mint-700 transition"
          >
            Manage Settings
          </Link>
          <Link
            to="/saved"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition"
          >
            View Saved Schemes ({user.savedSchemes})
          </Link>
        </div>
      </div>
    </section>
  );
}
