import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({ minimal = false, landing = false }) => {
  const nav = useNavigate()
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setDropdownOpen(false)
    nav('/login')
  }

  // Landing page navbar (simplified)
  if (landing) {
    return (
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => nav('/')}>
          <span role="img" aria-label="logo" className="navbar-logo-icon">🧠</span>
          <span className="navbar-name">NeuraLearn AI</span>
        </div>
        <div className="navbar-right">
          <button className="navbar-login-btn" onClick={() => nav('/login')}>
            Log in
          </button>
          <button className="navbar-signup-btn" onClick={() => nav('/login')}>
            Sign Up
          </button>
        </div>
      </nav>
    )
  }

  // Minimal navbar (login page)
  if (minimal) {
    return (
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => nav('/')}>
          <span role="img" aria-label="logo" className="navbar-logo-icon">🧠</span>
          <span className="navbar-name">NeuraLearn AI</span>
        </div>
      </nav>
    )
  }

  // Full navbar (authenticated pages)
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => nav('/dashboard')}>
        <span role="img" aria-label="logo" className="navbar-logo-icon">🧠</span>
        <span className="navbar-name">NeuraLearn AI</span>
      </div>

      <div className="navbar-right">
        {/* Profile Avatar with Dropdown */}
        <div className="navbar-profile-wrapper" ref={dropdownRef}>
          <button
            className="navbar-avatar-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            title="Account"
            aria-label="Open profile menu"
          >
            {user.avatar ? (
              <img src={user.avatar} alt="profile" className="navbar-avatar-img" />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" strokeLinecap="round"/>
              </svg>
            )}
          </button>

          {dropdownOpen && (
            <div className="navbar-dropdown">
              <button className="navbar-dropdown-item" onClick={() => { setDropdownOpen(false); nav('/profile') }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" strokeLinecap="round"/>
                </svg>
                Profile
              </button>
              <button className="navbar-dropdown-item" onClick={() => { setDropdownOpen(false); nav('/settings') }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                Settings
              </button>
              <div className="navbar-dropdown-divider"></div>
              <button className="navbar-dropdown-item navbar-dropdown-logout" onClick={handleLogout}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
