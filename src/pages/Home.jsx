"use client"

import { useState } from "react"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { ref, set, get } from "firebase/database"
import { auth, database } from "../firebase/config"

function Home() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const generateUsername = (email, displayName) => {
    // Try to use display name first, then email prefix
    let baseUsername = displayName ? displayName.replace(/\s+/g, '').toLowerCase() : email.split('@')[0]
    
    // Remove special characters and ensure it's alphanumeric
    baseUsername = baseUsername.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    
    // Ensure minimum length
    if (baseUsername.length < 3) {
      baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    }
    
    return baseUsername
  }

  const createUniqueUsername = async (baseUsername) => {
    let username = baseUsername
    let counter = 1
    
    // Check if username exists and create unique one if needed
    while (true) {
      const usernameRef = ref(database, `vinCtf/${username}`)
      const snapshot = await get(usernameRef)
      
      if (!snapshot.exists()) {
        return username
      }
      
      username = `${baseUsername}${counter}`
      counter++
      
      // Prevent infinite loop
      if (counter > 999) {
        username = `${baseUsername}${Date.now()}`
        break
      }
    }
    
    return username
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError("")

    try {
      const provider = new GoogleAuthProvider()
      provider.addScope("email")
      provider.addScope("profile")

      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check if user already exists in database
      const snapshot = await get(ref(database, "vinCtf"))
      let existingUser = null
      
      if (snapshot.exists()) {
        const data = snapshot.val()
        existingUser = Object.entries(data).find(([username, userData]) => userData.uid === user.uid)
      }

      if (existingUser) {
        // User exists, login successful
        console.log("User already exists:", existingUser[0])
        return
      }

      // New user - create profile automatically
      const baseUsername = generateUsername(user.email, user.displayName)
      const uniqueUsername = await createUniqueUsername(baseUsername)

      // Save user data to realtime database
      await set(ref(database, `vinCtf/${uniqueUsername}`), {
        uid: user.uid,
        email: user.email,
        username: uniqueUsername,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        points: 0,
        challenges_solved: [],
        createdAt: new Date().toISOString(),
      })

      console.log("New user profile created:", uniqueUsername)
      
    } catch (error) {
      console.error("Authentication error:", error)
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Matrix-like background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/20 to-black"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-red-600 font-mono text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-lg mb-4">
              <span className="text-3xl font-bold text-white font-mono">V</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 font-mono">
            v1nt0r14<span className="text-red-600">CTF</span>
            </h1>
            <p className="text-gray-400 font-mono text-sm">CAPTURE THE FLAG COMPETITION</p>
            <div className="w-24 h-0.5 bg-red-600 mx-auto mt-4"></div>
          </div>

          {/* Auth Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white font-mono mb-2">[AUTHENTICATION]</h2>
              <p className="text-gray-400 font-mono text-sm">Sign in with your Gmail account</p>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-mono font-semibold py-3 px-4 rounded transition-colors flex items-center justify-center space-x-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>{loading ? "[AUTHENTICATING...]" : "[SIGN IN WITH GMAIL]"}</span>
            </button>

            {error && (
              <div className="mt-4 bg-red-900/50 border border-red-600 rounded px-4 py-3">
                <p className="text-red-400 text-sm font-mono">[ERROR] {error}</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-center text-gray-400 text-sm font-mono">
                SYSTEM STATUS: <span className="text-green-500">ONLINE</span>
              </p>
              <p className="text-center text-gray-500 text-xs font-mono mt-2">
                New users will be automatically registered
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
