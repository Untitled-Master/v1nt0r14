"use client"

import { useState, useEffect } from "react"
import { ref, get } from "firebase/database"
import { database } from "../firebase/config"

function Scoreboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchScoreboard()
    const interval = setInterval(fetchScoreboard, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchScoreboard = async () => {
    try {
      const snapshot = await get(ref(database, "vinCtf"))
      if (snapshot.exists()) {
        const data = snapshot.val()
        const usersList = Object.values(data)
          .sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points
            return (b.challenges_solved?.length || 0) - (a.challenges_solved?.length || 0)
          })
          .map((user, index) => ({ ...user, rank: index + 1 }))
        setUsers(usersList)
      }
    } catch (error) {
      console.error("Error fetching scoreboard:", error)
    }
    setLoading(false)
  }

  const getRankDisplay = (rank) => {
    switch (rank) {
      case 1:
        return { icon: "👑", color: "text-yellow-500", bg: "bg-yellow-900/20 border-yellow-600" }
      case 2:
        return { icon: "🥈", color: "text-gray-400", bg: "bg-gray-800/50 border-gray-600" }
      case 3:
        return { icon: "🥉", color: "text-amber-600", bg: "bg-amber-900/20 border-amber-600" }
      default:
        return { icon: `#${rank}`, color: "text-gray-400", bg: "bg-gray-900 border-gray-700" }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-500 text-lg font-mono">LOADING SCOREBOARD...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white font-mono mb-2">
              [SCOREBOARD<span className="text-red-600">]</span>
            </h1>
            <p className="text-gray-400 font-mono">REAL-TIME COMPETITION RANKINGS</p>
          </div>
          <div className="w-full h-0.5 bg-gradient-to-r from-red-600 via-red-500 to-transparent"></div>
        </div>

        {/* Top 3 Podium */}
        {users.length >= 3 && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* 2nd Place */}
            <div className="order-1 md:order-1">
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6 text-center h-48 flex flex-col justify-center">
                <div className="text-4xl mb-2">🥈</div>
                <h3 className="text-xl font-bold text-white font-mono mb-1">{users[1].username}</h3>
                <div className="text-2xl font-bold text-gray-400 font-mono mb-1">{users[1].points}</div>
                <div className="text-sm text-gray-500 font-mono">{users[1].challenges_solved?.length || 0} solved</div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="order-2 md:order-2">
              <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-6 text-center h-56 flex flex-col justify-center transform md:scale-105">
                <div className="text-5xl mb-3">👑</div>
                <h3 className="text-2xl font-bold text-white font-mono mb-2">{users[0].username}</h3>
                <div className="text-3xl font-bold text-yellow-500 font-mono mb-2">{users[0].points}</div>
                <div className="text-sm text-yellow-300 font-mono">
                  {users[0].challenges_solved?.length || 0} solved
                </div>
                <div className="mt-2 bg-yellow-600 text-black px-3 py-1 rounded font-mono text-xs font-bold">
                  CHAMPION
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="order-3 md:order-3">
              <div className="bg-amber-900/20 border border-amber-600 rounded-lg p-6 text-center h-48 flex flex-col justify-center">
                <div className="text-4xl mb-2">🥉</div>
                <h3 className="text-xl font-bold text-white font-mono mb-1">{users[2].username}</h3>
                <div className="text-2xl font-bold text-amber-600 font-mono mb-1">{users[2].points}</div>
                <div className="text-sm text-amber-400 font-mono">{users[2].challenges_solved?.length || 0} solved</div>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
          <div className="bg-red-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white font-mono">FULL RANKINGS</h2>
          </div>

          <div className="p-6">
            {users.length > 0 ? (
              <div className="space-y-2">
                {users.map((user) => {
                  const rankDisplay = getRankDisplay(user.rank)

                  return (
                    <div
                      key={user.uid}
                      className={`${rankDisplay.bg} border rounded-lg p-4 flex items-center justify-between transition-all duration-200 hover:bg-opacity-80`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 ${rankDisplay.bg} border rounded-lg flex items-center justify-center`}
                        >
                          <span className={`font-mono font-bold ${rankDisplay.color}`}>
                            {user.rank <= 3 ? rankDisplay.icon : `#${user.rank}`}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white font-mono">{user.username}</h3>
                          <p className="text-gray-400 font-mono text-sm">
                            {user.challenges_solved?.length || 0} challenges solved
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-500 font-mono">{user.points}</div>
                        <div className="text-gray-400 font-mono text-sm">POINTS</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 font-mono text-xl mb-2">NO PARTICIPANTS YET</div>
                <p className="text-gray-400 font-mono">Be the first to register and start competing!</p>
              </div>
            )}
          </div>
        </div>

        {/* Live Update Indicator */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-gray-900 border border-gray-700 rounded px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-400 font-mono text-sm">LIVE UPDATES</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scoreboard
