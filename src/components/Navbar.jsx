"use client"

import { Link, useLocation } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"
import { useState } from "react"

function Navbar({ user }) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const isActive = (path) => location.pathname === path

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/challenges" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold font-mono text-sm sm:text-base">V</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-white font-mono">
              VIN<span className="text-red-600">CTF</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/challenges"
              className={`px-3 lg:px-4 py-2 rounded font-mono text-sm font-semibold transition-colors ${
                isActive("/challenges") ? "bg-red-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              [CHALLENGES]
            </Link>
            <Link
              to="/profile"
              className={`px-3 lg:px-4 py-2 rounded font-mono text-sm font-semibold transition-colors ${
                isActive("/profile") ? "bg-red-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              [PROFILE]
            </Link>
            <Link
              to="/scoreboard"
              className={`px-3 lg:px-4 py-2 rounded font-mono text-sm font-semibold transition-colors ${
                isActive("/scoreboard") ? "bg-red-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              [SCOREBOARD]
            </Link>
          </div>

          {/* Desktop User Info & Logout */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <div className="flex items-center space-x-2 lg:space-x-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL || "/placeholder.svg"}
                  alt="Profile"
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border border-gray-600"
                />
              ) : (
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-mono text-xs lg:text-sm">{user.email?.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div className="text-right">
                <div className="text-white font-mono text-xs lg:text-sm font-semibold truncate max-w-24 lg:max-w-32">
                  {user.displayName || user.email.split("@")[0]}
                </div>
                <div className="text-gray-400 font-mono text-xs">AUTH</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 lg:px-4 py-2 rounded font-mono text-xs lg:text-sm font-semibold transition-colors"
            >
              [LOGOUT]
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <div className="space-y-2">
              <Link
                to="/challenges"
                onClick={closeMobileMenu}
                className={`block px-4 py-3 rounded font-mono text-sm font-semibold transition-colors ${
                  isActive("/challenges") ? "bg-red-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                [CHALLENGES]
              </Link>
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className={`block px-4 py-3 rounded font-mono text-sm font-semibold transition-colors ${
                  isActive("/profile") ? "bg-red-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                [PROFILE]
              </Link>
              <Link
                to="/scoreboard"
                onClick={closeMobileMenu}
                className={`block px-4 py-3 rounded font-mono text-sm font-semibold transition-colors ${
                  isActive("/scoreboard") ? "bg-red-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                [SCOREBOARD]
              </Link>
            </div>

            {/* Mobile User Info */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center space-x-3 px-4 mb-4">
                {user.photoURL ? (
                  <img
                    src={user.photoURL || "/placeholder.svg"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-600"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-mono text-sm">{user.email?.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <div>
                  <div className="text-white font-mono text-sm font-semibold">
                    {user.displayName || user.email.split("@")[0]}
                  </div>
                  <div className="text-gray-400 font-mono text-xs">{user.email}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded font-mono text-sm font-semibold transition-colors"
              >
                [LOGOUT]
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
