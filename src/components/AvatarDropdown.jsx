import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

// Simple avatar dropdown component for the header
export default function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { /* add any needed user data from context */ } = useApp();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Placeholder user name (no user data in context yet)
  const userName = "User";

  return (
    <div className="avatar-dropdown" ref={dropdownRef} style={{ position: "relative" }}>
      <button
        type="button"
        className="avatar-button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        {/* Simple placeholder avatar circle */}
        <span
          className="avatar-circle"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#bbb",
          }}
        />
        <span className="avatar-name" style={{ fontSize: "0.9rem" }}>{userName}</span>
        <ChevronDown size={14} />
      </button>
      {open && (
        <ul
          className="avatar-menu"
          role="menu"
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 4px)",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "0.5rem 0",
            margin: 0,
            listStyle: "none",
            minWidth: "150px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <li role="none">
            <Link to="/account/profile" className="avatar-menu-item" role="menuitem" style={menuItemStyle}>
              My Profile
            </Link>
          </li>
          <li role="none">
            <Link to="/dashboard" className="avatar-menu-item" role="menuitem" style={menuItemStyle}>
              My Dashboard
            </Link>
          </li>
          <li role="none">
            <Link to="/saved" className="avatar-menu-item" role="menuitem" style={menuItemStyle}>
              Saved Schemes
            </Link>
          </li>
          <li role="none">
            <Link to="/documents" className="avatar-menu-item" role="menuitem" style={menuItemStyle}>
              My Documents
            </Link>
          </li>
          <li role="none">
            <Link to="/account/settings" className="avatar-menu-item" role="menuitem" style={menuItemStyle}>
              Account Settings
            </Link>
          </li>
          <li role="none">
            <button
              type="button"
              onClick={() => {
                // Placeholder sign‑out logic – could clear localStorage etc.
                alert("Signed out");
              }}
              className="avatar-menu-item"
              role="menuitem"
              style={menuItemStyle}
            >
              Sign Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

// Inline style object to keep the component self‑contained without extra CSS files
const menuItemStyle = {
  display: "block",
  width: "100%",
  padding: "0.5rem 1rem",
  color: "#333",
  textDecoration: "none",
  background: "transparent",
  textAlign: "left",
};
