"use client"

import { useState, useEffect } from "react"
import { ref, get, update } from "firebase/database"
import { database } from "../firebase/config"
import { challenges } from "../data/challenges"

function Challenges({ user }) {
  const [userStats, setUserStats] = useState(null)
  const [flagInputs, setFlagInputs] = useState({})
  const [messages, setMessages] = useState({})
  const [loading, setLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    fetchUserStats()
  }, [user, retryCount])

  const fetchUserStats = async () => {
    try {
      const snapshot = await get(ref(database, "vinCtf"))
      if (snapshot.exists()) {
        const data = snapshot.val()
        const userData = Object.entries(data).find(([username, userData]) => userData.uid === user.uid)
        
        if (userData) {
          setUserStats(userData[1]) // userData[1] contains the user data
        } else {
          console.log("User data not found, user might be newly created")
          setUserStats(null)
        }
      } else {
        console.log("No vinCtf data found in database")
        setUserStats(null)
      }
    } catch (error) {
      console.error("Error fetching user stats:", error)
      setUserStats(null)
    }
    setLoading(false)
  }

  const handleRetry = () => {
    setLoading(true)
    setRetryCount(prev => prev + 1)
  }

  const handleFlagSubmit = async (challengeId, challengePoints) => {
    // Check if userStats exists
    if (!userStats) {
      setMessages({ ...messages, [challengeId]: { type: "error", text: "USER DATA NOT FOUND" } })
      return
    }

    const submittedFlag = flagInputs[challengeId]
    const challenge = challenges.find((c) => c.id === challengeId)

    if (!submittedFlag) {
      setMessages({ ...messages, [challengeId]: { type: "error", text: "FLAG REQUIRED" } })
      return
    }

    // Ensure challenges_solved is an array
    const challengesSolved = userStats.challenges_solved || []

    if (challengesSolved.includes(challengeId)) {
      setMessages({ ...messages, [challengeId]: { type: "error", text: "ALREADY SOLVED" } })
      return
    }

    if (submittedFlag === challenge.flag) {
      try {
        const newChallengesSolved = [...challengesSolved, challengeId]
        const newPoints = (userStats.points || 0) + challengePoints

        await update(ref(database, `vinCtf/${userStats.username}`), {
          points: newPoints,
          challenges_solved: newChallengesSolved,
        })

        setUserStats({
          ...userStats,
          points: newPoints,
          challenges_solved: newChallengesSolved,
        })

        setMessages({ ...messages, [challengeId]: { type: "success", text: "FLAG ACCEPTED" } })
        setFlagInputs({ ...flagInputs, [challengeId]: "" })
      } catch (error) {
        console.error("Error updating user stats:", error)
        setMessages({ ...messages, [challengeId]: { type: "error", text: "SYSTEM ERROR" } })
      }
    } else {
      setMessages({ ...messages, [challengeId]: { type: "error", text: "INVALID FLAG" } })
    }
  }

  const handleInputChange = (challengeId, value) => {
    setFlagInputs({ ...flagInputs, [challengeId]: value })
    if (messages[challengeId]) {
      setMessages({ ...messages, [challengeId]: null })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-500 text-lg font-mono">LOADING CHALLENGES...</p>
        </div>
      </div>
    )
  }

  // Show setup message if user data not found
  if (!userStats) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-900/50 border border-red-600 rounded-lg p-8 max-w-md">
            <h2 className="text-xl font-bold text-white font-mono mb-4">[PROFILE LOADING]</h2>
            <p className="text-gray-300 font-mono text-sm mb-6">
              Your profile is being set up. This may take a few moments for new accounts.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-mono font-semibold py-2 px-4 rounded transition-colors"
              >
                [RETRY]
              </button>
              <p className="text-gray-400 font-mono text-xs">
                If this persists, try logging out and back in
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white font-mono">
              [CHALLENGES<span className="text-red-600">]</span>
            </h1>
            <div className="flex items-center space-x-6 text-sm font-mono">
              <div className="bg-gray-900 border border-gray-700 px-4 py-2 rounded">
                <span className="text-gray-400">USER:</span>
                <span className="text-green-500 ml-2 font-bold">{userStats?.username}</span>
              </div>
              <div className="bg-gray-900 border border-gray-700 px-4 py-2 rounded">
                <span className="text-gray-400">POINTS:</span>
                <span className="text-red-500 ml-2 font-bold">{userStats?.points || 0}</span>
              </div>
              <div className="bg-gray-900 border border-gray-700 px-4 py-2 rounded">
                <span className="text-gray-400">SOLVED:</span>
                <span className="text-green-500 ml-2 font-bold">
                  {userStats?.challenges_solved?.length || 0}/{challenges.length}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-0.5 bg-gradient-to-r from-red-600 to-transparent"></div>
        </div>

        {/* Challenges Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {challenges.map((challenge) => {
            const challengesSolved = userStats?.challenges_solved || []
            const isSolved = challengesSolved.includes(challenge.id)
            const message = messages[challenge.id]

            return (
              <div
                key={challenge.id}
                className={`bg-gray-900 border rounded-lg p-6 transition-all duration-300 ${
                  isSolved ? "border-green-600 bg-green-900/20" : "border-gray-700 hover:border-red-600/50"
                }`}
              >
                {/* Challenge Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-white font-mono">{challenge.title}</h3>
                      {isSolved && <span className="text-green-500 text-sm font-mono">[SOLVED]</span>}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-mono font-bold">
                        {challenge.points} PTS
                      </span>
                      <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm font-mono">
                        {challenge.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Challenge Description */}
                <div className="mb-6">
                  <p className="text-gray-300 font-mono text-sm leading-relaxed break-words">{challenge.description}</p>
                </div>

                {/* Flag Submission */}
                {!isSolved ? (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={flagInputs[challenge.id] || ""}
                        onChange={(e) => handleInputChange(challenge.id, e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleFlagSubmit(challenge.id, challenge.points)}
                        className="flex-1 bg-black border border-gray-700 rounded px-4 py-2 text-white font-mono text-sm focus:border-red-600 focus:outline-none transition-colors"
                        placeholder="v1nt0r14{...}"
                      />
                      <button
                        onClick={() => handleFlagSubmit(challenge.id, challenge.points)}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-mono text-sm font-semibold transition-colors"
                      >
                        SUBMIT
                      </button>
                    </div>

                    {message && (
                      <div
                        className={`px-4 py-2 rounded font-mono text-sm ${
                          message.type === "success"
                            ? "bg-green-900/50 border border-green-600 text-green-400"
                            : "bg-red-900/50 border border-red-600 text-red-400"
                        }`}
                      >
                        [{message.type.toUpperCase()}] {message.text}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-900/30 border border-green-600 rounded px-4 py-3">
                    <p className="text-green-400 font-mono text-sm font-semibold">
                      ✓ CHALLENGE COMPLETED - {challenge.points} POINTS AWARDED
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Challenges
