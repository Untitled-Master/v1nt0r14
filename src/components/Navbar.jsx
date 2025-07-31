"use client"

import { Link, useLocation } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"

function Navbar({ user }) {
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/challenges" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold font-mono">V</span>
            </div>
            <span className="text-xl font-bold text-white font-mono">
            v1nt0r14<span className="text-red-600">CTF</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link
              to="/challenges"
              className={`px-4 py-2 rounded font-mono text-sm font-semibold transition-colors ${
                isActive("/challenges") ? "bg-red-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              [CHALLENGES]
            </Link>
            <Link
              to="/profile"
              className={`px-4 py-2 rounded font-mono text-sm font-semibold transition-colors ${
                isActive("/profile") ? "bg-red-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              [PROFILE]
            </Link>
            <Link
              to="/scoreboard"
              className={`px-4 py-2 rounded font-mono text-sm font-semibold transition-colors ${
                isActive("/scoreboard") ? "bg-red-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              [SCOREBOARD]
            </Link>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL || "/placeholder.svg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-gray-600"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-mono text-sm">{user.email?.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div className="text-right">
                <div className="text-white font-mono text-sm font-semibold">
                  {user.displayName || user.email.split("@")[0]}
                </div>
                <div className="text-gray-400 font-mono text-xs">AUTHENTICATED</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-mono text-sm font-semibold transition-colors"
            >
              [LOGOUT]
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
