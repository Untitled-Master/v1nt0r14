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
  const [allUsers, setAllUsers] = useState([])
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [showStatsModal, setShowStatsModal] = useState(false)

  useEffect(() => {
    fetchUserStats()
  }, [user, retryCount])

  const fetchUserStats = async () => {
    try {
      const snapshot = await get(ref(database, "vinCtf"))
      if (snapshot.exists()) {
        const data = snapshot.val()
        const userData = Object.entries(data).find(([username, userData]) => userData.uid === user.uid)
        
        // Store all users for statistics
        const usersArray = Object.values(data)
        setAllUsers(usersArray)

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
    setRetryCount((prev) => prev + 1)
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
        
        // Refresh user data to update statistics
        fetchUserStats()
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

  const getChallengeStats = (challengeId) => {
    const solvers = allUsers.filter(user => 
      user.challenges_solved && user.challenges_solved.includes(challengeId)
    )
    
    return {
      solveCount: solvers.length,
      solvers: solvers.sort((a, b) => {
        // Sort by points descending, then by username
        if (b.points !== a.points) return b.points - a.points
        return a.username.localeCompare(b.username)
      })
    }
  }

  const openStatsModal = (challenge) => {
    setSelectedChallenge(challenge)
    setShowStatsModal(true)
  }

  const closeStatsModal = () => {
    setShowStatsModal(false)
    setSelectedChallenge(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-500 text-base sm:text-lg font-mono">LOADING CHALLENGES...</p>
        </div>
      </div>
    )
  }

  // Show setup message if user data not found
  if (!userStats) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-red-900/50 border border-red-600 rounded-lg p-6 sm:p-8 max-w-sm sm:max-w-md w-full">
            <h2 className="text-lg sm:text-xl font-bold text-white font-mono mb-4">[PROFILE LOADING]</h2>
            <p className="text-gray-300 font-mono text-sm mb-6">
              Your profile is being set up. This may take a few moments for new accounts.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-mono font-semibold py-3 px-4 rounded transition-colors touch-manipulation"
              >
                [RETRY]
              </button>
              <p className="text-gray-400 font-mono text-xs">If this persists, try logging out and back in</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono mb-4">
              [CHALLENGES<span className="text-red-600">]</span>
            </h1>

            {/* Mobile Stats - Stacked */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-xs sm:text-sm font-mono">
              <div className="bg-gray-900 border border-gray-700 px-3 sm:px-4 py-2 rounded">
                <span className="text-gray-400">USER:</span>
                <span className="text-green-500 ml-2 font-bold truncate">{userStats?.username}</span>
              </div>
              <div className="bg-gray-900 border border-gray-700 px-3 sm:px-4 py-2 rounded">
                <span className="text-gray-400">POINTS:</span>
                <span className="text-red-500 ml-2 font-bold">{userStats?.points || 0}</span>
              </div>
              <div className="bg-gray-900 border border-gray-700 px-3 sm:px-4 py-2 rounded">
                <span className="text-gray-400">SOLVED:</span>
                <span className="text-green-500 ml-2 font-bold">
                  {userStats?.challenges_solved?.length || 0}/{challenges.length}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-0.5 bg-gradient-to-r from-red-600 to-transparent"></div>
        </div>

        {/* Challenges Grid - Single column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {challenges.map((challenge) => {
            const challengesSolved = userStats?.challenges_solved || []
            const isSolved = challengesSolved.includes(challenge.id)
            const message = messages[challenge.id]
            const stats = getChallengeStats(challenge.id)

            return (
              <div
                key={challenge.id}
                className={`bg-gray-900 border rounded-lg p-4 sm:p-6 transition-all duration-300 ${
                  isSolved ? "border-green-600 bg-green-900/20" : "border-gray-700 hover:border-red-600/50"
                }`}
              >
                {/* Challenge Header */}
                <div className="mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div className="mb-2 sm:mb-0">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white font-mono">{challenge.title}</h3>
                        {isSolved && <span className="text-green-500 text-xs sm:text-sm font-mono">[SOLVED]</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-mono font-bold">
                      {challenge.points} PTS
                    </span>
                    <span className="bg-gray-800 text-gray-300 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-mono">
                      {challenge.category}
                    </span>
                    {/* Stats Indicator */}
                    <button
                      onClick={() => openStatsModal(challenge)}
                      className="bg-green-600 hover:bg-green-700 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-mono font-bold transition-colors cursor-pointer flex items-center space-x-1"
                      title="View challenge statistics"
                    >
                      <span>📊</span>
                      <span>{stats.solveCount} SOLVES</span>
                    </button>
                  </div>
                </div>

                {/* Challenge Description */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-gray-300 font-mono text-sm leading-relaxed break-words">{challenge.description}</p>
                </div>

                {/* Flag Submission */}
                {!isSolved ? (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <input
                        type="text"
                        value={flagInputs[challenge.id] || ""}
                        onChange={(e) => handleInputChange(challenge.id, e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleFlagSubmit(challenge.id, challenge.points)}
                        className="flex-1 bg-black border border-gray-700 rounded px-3 sm:px-4 py-2 sm:py-3 text-white font-mono text-sm focus:border-red-600 focus:outline-none transition-colors"
                        placeholder="v1nt0r14{...}"
                      />
                      <button
                        onClick={() => handleFlagSubmit(challenge.id, challenge.points)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-mono text-sm font-semibold transition-colors touch-manipulation whitespace-nowrap"
                      >
                        SUBMIT
                      </button>
                    </div>

                    {message && (
                      <div
                        className={`px-3 sm:px-4 py-2 sm:py-3 rounded font-mono text-sm ${
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
                  <div className="bg-green-900/30 border border-green-600 rounded px-3 sm:px-4 py-3">
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

      {/* Statistics Modal */}
      {showStatsModal && selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-red-600 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold text-white font-mono">
                [CHALLENGE_STATS]
              </h3>
              <button
                onClick={closeStatsModal}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <h4 className="text-lg font-bold text-white font-mono mb-2">{selectedChallenge.title}</h4>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-mono font-bold">
                    {selectedChallenge.points} PTS
                  </span>
                  <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-mono">
                    {selectedChallenge.category}
                  </span>
                </div>
              </div>

              {/* Statistics */}
              <div className="mb-6">
                <div className="bg-black border border-gray-800 rounded p-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500 font-mono">
                      {getChallengeStats(selectedChallenge.id).solveCount}
                    </div>
                    <div className="text-gray-400 text-sm font-mono">TOTAL SOLVES</div>
                  </div>
                </div>

                <div className="bg-black border border-gray-800 rounded p-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-yellow-500 font-mono">
                      {allUsers.length > 0 ? 
                        ((getChallengeStats(selectedChallenge.id).solveCount / allUsers.length) * 100).toFixed(1) 
                        : 0}%
                    </div>
                    <div className="text-gray-400 text-sm font-mono">SOLVE RATE</div>
                  </div>
                </div>
              </div>

              {/* Solvers List */}
              <div>
                <h5 className="text-white font-mono font-bold mb-3">SOLVED BY:</h5>
                <div className="max-h-48 overflow-y-auto">
                  {getChallengeStats(selectedChallenge.id).solvers.length > 0 ? (
                    <div className="space-y-2">
                      {getChallengeStats(selectedChallenge.id).solvers.map((solver, index) => (
                        <div
                          key={solver.uid}
                          className="bg-gray-800 border border-gray-700 rounded p-3 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                              {solver.photoURL ? (
                                <img
                                  src={solver.photoURL || "https://i.pinimg.com/736x/38/b9/4b/38b94b759244eaef3ec4655dde0d6e3d.jpg"}
                                  alt="Profile"
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-white font-mono text-xs">
                                  {solver.username?.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="text-white font-mono text-sm font-semibold">
                                {solver.username}
                              </div>
                              <div className="text-gray-400 font-mono text-xs">
                                {solver.points} points total
                              </div>
                            </div>
                          </div>
                          <div className="text-green-500 font-mono text-sm font-bold">
                            #{index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-500 font-mono text-sm mb-2">NO SOLVERS YET</div>
                      <p className="text-gray-400 font-mono text-xs">Be the first to solve this challenge!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-800 px-4 sm:px-6 py-3 sm:py-4">
              <button
                onClick={closeStatsModal}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-mono font-semibold py-2 px-4 rounded transition-colors"
              >
                [CLOSE]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Challenges
