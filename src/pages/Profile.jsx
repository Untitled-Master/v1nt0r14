"use client"

import { useState, useEffect } from "react"
import { ref, get } from "firebase/database"
import { database } from "../firebase/config"
import { challenges } from "../data/challenges"

function Profile({ user }) {
  const [userStats, setUserStats] = useState(null)
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
          console.log("User data not found")
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

  const getSolvedChallenges = () => {
    if (!userStats?.challenges_solved) return []
    return challenges.filter((challenge) => userStats.challenges_solved.includes(challenge.id))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-500 text-lg font-mono">LOADING PROFILE...</p>
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

  const solvedChallenges = getSolvedChallenges()
  const totalChallenges = challenges.length
  const completionRate = totalChallenges > 0 ? ((solvedChallenges.length / totalChallenges) * 100).toFixed(1) : 0
  const totalPoints = challenges.reduce((sum, challenge) => sum + challenge.points, 0)

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-mono mb-4">
            [USER_PROFILE<span className="text-red-600">]</span>
          </h1>
          <div className="w-full h-0.5 bg-gradient-to-r from-red-600 to-transparent"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  {userStats?.photoURL ? (
                    <img
                      src={userStats.photoURL || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white font-mono">
                      {userStats?.username?.charAt(0).toUpperCase() || "?"}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white font-mono">{userStats?.username || "Unknown"}</h2>
                <p className="text-gray-400 font-mono text-sm">{user.email}</p>
                {userStats?.displayName && <p className="text-gray-500 font-mono text-xs">{userStats.displayName}</p>}
              </div>

              <div className="space-y-4">
                <div className="bg-black border border-gray-800 rounded p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500 font-mono">{userStats?.points || 0}</div>
                    <div className="text-gray-400 text-sm font-mono">TOTAL POINTS</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black border border-gray-800 rounded p-4 text-center">
                    <div className="text-xl font-bold text-green-500 font-mono">{solvedChallenges.length}</div>
                    <div className="text-gray-400 text-xs font-mono">SOLVED</div>
                  </div>
                  <div className="bg-black border border-gray-800 rounded p-4 text-center">
                    <div className="text-xl font-bold text-yellow-500 font-mono">{completionRate}%</div>
                    <div className="text-gray-400 text-xs font-mono">COMPLETE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats and Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Bar */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white font-mono mb-4">PROGRESS OVERVIEW</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-mono mb-2">
                    <span className="text-gray-400">COMPLETION RATE</span>
                    <span className="text-white">{completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-mono mb-2">
                    <span className="text-gray-400">POINTS EARNED</span>
                    <span className="text-white">
                      {userStats?.points || 0} / {totalPoints}
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((userStats?.points || 0) / totalPoints) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solved Challenges */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white font-mono mb-4">SOLVED CHALLENGES</h3>
              {solvedChallenges.length > 0 ? (
                <div className="space-y-3">
                  {solvedChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className="bg-green-900/20 border border-green-600/50 rounded p-4 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-white font-mono font-semibold">{challenge.title}</h4>
                        <p className="text-gray-400 font-mono text-sm">{challenge.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-green-500 font-mono font-bold">+{challenge.points}</div>
                        <div className="text-gray-400 font-mono text-xs">POINTS</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-500 font-mono text-lg mb-2">NO CHALLENGES SOLVED</div>
                  <p className="text-gray-400 font-mono text-sm">Start solving challenges to see your progress here</p>
                </div>
              )}
            </div>

            {/* Challenge Categories */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white font-mono mb-4">CATEGORY BREAKDOWN</h3>
              <div className="grid grid-cols-2 gap-4">
                {["OSINT", "WEB", "CRYPTO", "FORENSICS"].map((category) => {
                  const categoryTotal = challenges.filter((c) => c.category === category).length
                  const categorySolved = solvedChallenges.filter((c) => c.category === category).length
                  const categoryPercent = categoryTotal > 0 ? (categorySolved / categoryTotal) * 100 : 0

                  return (
                    <div key={category} className="bg-black border border-gray-800 rounded p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-mono text-sm">{category}</span>
                        <span className="text-gray-400 font-mono text-xs">
                          {categorySolved}/{categoryTotal}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1">
                        <div
                          className="bg-red-600 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${categoryPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
