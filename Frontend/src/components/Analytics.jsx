
import React, { useState, useEffect } from 'react'

const API_URL = 'https://sgp-backend-8fvy.onrender.com/goals'

function ProgressBar({ current, target }) {
  const percent = Math.min(100, (current / target) * 100)
  let color = '#e14546'
  if (percent >= 100) color = '#22c55e'
  else if (percent > 70) color = '#eab308'
  return (
    <div className="w-full h-3 bg-gray-700 rounded mt-2 overflow-hidden">
      <div
        className="h-full rounded transition-all duration-300"
        style={{ width: `${percent}%`, background: color }}
      ></div>
    </div>
  )
}


export default function Analytics() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setGoals(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to fetch goals')
        setLoading(false)
      })
  }, [])

  const totalGoals = goals.length
  const completedGoals = goals.filter(g => (g.savedAmount || 0) >= (g.targetAmount || 0)).length
  const activeGoals = goals.filter(g => (g.savedAmount || 0) < (g.targetAmount || 0))
  const totalSaved = goals.reduce((sum, g) => sum + (g.savedAmount || 0), 0)
  const totalTarget = goals.reduce((sum, g) => sum + (g.targetAmount || 0), 0)
  const percentOverall = totalTarget ? Math.round((totalSaved / totalTarget) * 100) : 0

  if (loading) return <div className="text-center text-gray-400 py-8">Loading...</div>
  if (error) return <div className="text-center text-red-400 py-8">{error}</div>

  return (
    <div className="analyticsPage flex flex-col items-center justify-start p-4 bg-inherit min-h-screen w-screen text-white">
      <h1 className="text-[28px] font-semibold mb-6">Analytics</h1>
      <div className="w-full max-w-2xl bg-black/40 rounded-lg p-6 mb-8 flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div>
            <div className="text-lg font-bold">{totalGoals}</div>
            <div className="text-xs text-gray-300">Total Goals</div>
          </div>
          <div>
            <div className="text-lg font-bold">{completedGoals}</div>
            <div className="text-xs text-gray-300">Completed</div>
          </div>
          <div>
            <div className="text-lg font-bold">{activeGoals.length}</div>
            <div className="text-xs text-gray-300">Active</div>
          </div>
          <div>
            <div className="text-lg font-bold">${totalSaved.toLocaleString()}</div>
            <div className="text-xs text-gray-300">Total Saved</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-xs text-gray-300 mb-1">Overall Progress</div>
          <ProgressBar current={totalSaved} target={totalTarget} />
          <div className="text-xs text-gray-400 mt-1">{percentOverall}% of all goals reached</div>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-2">All Goals Progress</h2>
        <div className="flex flex-col gap-4">
          {goals.map(goal => {
            const target = goal.targetAmount !== undefined && goal.targetAmount !== null ? Number(goal.targetAmount) : 0;
            const saved = goal.savedAmount !== undefined && goal.savedAmount !== null ? Number(goal.savedAmount) : 0;
            const percent = target > 0 ? Math.round((saved / target) * 100) : 0;
            return (
              <div key={goal.id} className="bg-black/60 rounded-lg p-4 border border-gray-700">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <div className="font-semibold text-lg">{goal.name}</div>
                    <div className="text-xs text-gray-400">{goal.category} &middot; Target: ${target.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Deadline: {goal.deadline}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm">Saved: <span className="font-bold">${saved.toLocaleString()}</span></span>
                    <div className="text-xs text-gray-400">
                      {percent}% complete
                    </div>
                  </div>
                </div>
                <ProgressBar current={saved} target={target} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Simple Analytics Extras for School Project */}
      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-lg font-semibold mb-4 text-[#e14546] flex items-center gap-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e14546" opacity="0.15"/><path d="M12 7v5l3 3" stroke="#e14546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Fun Facts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-black/60 rounded-lg p-4 border border-gray-700 flex flex-col items-start">
            <span className="text-xs text-gray-400 mb-1">Most Common Category</span>
            <span className="text-base font-semibold text-white">{
              goals.length
                ? goals.reduce((acc, g) => {
                    acc[g.category] = (acc[g.category] || 0) + 1; return acc;
                  }, {})
                  && Object.entries(goals.reduce((acc, g) => {
                    acc[g.category] = (acc[g.category] || 0) + 1; return acc;
                  }, {})).sort((a, b) => b[1] - a[1])[0][0]
                : 'N/A'
            }</span>
          </div>
          <div className="bg-black/60 rounded-lg p-4 border border-gray-700 flex flex-col items-start">
            <span className="text-xs text-gray-400 mb-1">Highest Target Amount</span>
            <span className="text-base font-semibold text-[#e14546]">${goals.length ? Math.max(...goals.map(g => g.targetAmount || 0)).toLocaleString() : '0'}</span>
          </div>
          <div className="bg-black/60 rounded-lg p-4 border border-gray-700 flex flex-col items-start">
            <span className="text-xs text-gray-400 mb-1">Lowest Saved Amount</span>
            <span className="text-base font-semibold text-[#e14546]">${goals.length ? Math.min(...goals.map(g => g.savedAmount || 0)).toLocaleString() : '0'}</span>
          </div>
          <div className="bg-black/60 rounded-lg p-4 border border-gray-700 flex flex-col items-start">
            <span className="text-xs text-gray-400 mb-1">Average Progress</span>
            <span className="text-base font-semibold text-white">{goals.length ? Math.round(goals.reduce((sum, g) => sum + ((g.targetAmount ? (g.savedAmount || 0) / g.targetAmount : 0)), 0) / goals.length * 100) : 0}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
