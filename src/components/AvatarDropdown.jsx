import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  User,
  LayoutDashboard,
  Bookmark,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const { savedIds } = useApp();

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // User Profile Data
  const userName = "John Doe";
  const userInitials = "JD";
  const userRole = "Citizen";
  const userLocation = "Karnataka";

  const handleSignOut = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="avatar-dropdown" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        className={`avatar-button ${open ? "is-active" : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`User menu for ${userName}`}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="avatar-circle">
          <span className="avatar-initials">{userInitials}</span>
          <span className="avatar-online-dot" aria-hidden="true" />
        </div>
        <span className="avatar-name">{userName}</span>
        <ChevronDown size={14} className={`avatar-chevron ${open ? "open" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="avatar-menu-card"
            role="menu"
            aria-orientation="vertical"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* User Profile Header Card */}
            <div className="avatar-menu-header">
              <div className="avatar-circle large">
                <span className="avatar-initials">{userInitials}</span>
              </div>
              <div className="avatar-menu-user-info">
                <div className="avatar-menu-name-row">
                  <span className="avatar-menu-name">{userName}</span>
                  <span className="avatar-menu-badge" title="Aadhaar Verified Citizen">
                    <ShieldCheck size={12} className="avatar-badge-icon" />
                    Verified
                  </span>
                </div>
                <span className="avatar-menu-email">john.doe@example.com</span>
                <span className="avatar-menu-region">{userLocation} • {userRole}</span>
              </div>
            </div>

            <div className="avatar-menu-divider" />

            {/* Menu Links */}
            <div className="avatar-menu-list">
              <Link
                to="/account/profile"
                className="avatar-menu-link"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <span className="avatar-item-icon-box"><User size={15} /></span>
                <span className="avatar-item-label">My Profile</span>
              </Link>

              <Link
                to="/dashboard"
                className="avatar-menu-link"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <span className="avatar-item-icon-box"><LayoutDashboard size={15} /></span>
                <span className="avatar-item-label">My Dashboard</span>
              </Link>

              <Link
                to="/saved"
                className="avatar-menu-link"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <span className="avatar-item-icon-box"><Bookmark size={15} /></span>
                <span className="avatar-item-label">Saved Schemes</span>
                {savedIds && savedIds.length > 0 && (
                  <span className="avatar-badge-pill">{savedIds.length}</span>
                )}
              </Link>

              <Link
                to="/documents"
                className="avatar-menu-link"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <span className="avatar-item-icon-box"><FileText size={15} /></span>
                <span className="avatar-item-label">My Documents</span>
              </Link>

              <Link
                to="/account/settings"
                className="avatar-menu-link"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <span className="avatar-item-icon-box"><Settings size={15} /></span>
                <span className="avatar-item-label">Account Settings</span>
              </Link>
            </div>

            <div className="avatar-menu-divider" />

            {/* Sign Out Button */}
            <button
              type="button"
              className="avatar-menu-link avatar-sign-out"
              role="menuitem"
              onClick={handleSignOut}
            >
              <span className="avatar-item-icon-box danger"><LogOut size={15} /></span>
              <span className="avatar-item-label">Sign Out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
