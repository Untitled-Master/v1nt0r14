"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/config"
import Home from "./pages/Home"
import Challenges from "./pages/Challenges"
import Profile from "./pages/Profile"
import Scoreboard from "./pages/Scoreboard"
import Navbar from "./components/Navbar"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-500 text-lg font-mono">LOADING SYSTEM...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        {user && <Navbar user={user} />}
        <Routes>
          <Route path="/" element={user ? <Navigate to="/challenges" /> : <Home />} />
          <Route path="/challenges" element={user ? <Challenges user={user} /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
          <Route path="/scoreboard" element={user ? <Scoreboard /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
