
import React, { useState, useEffect } from 'react'
import { MdAdd, MdDashboard, MdGpsFixed } from 'react-icons/md'
import GoalCard from './GoalCard'

const API_URL = 'http://localhost:3001/goals'


export default function Dashboard() {
  const [showGoalForm, setShowGoalForm] = useState(false)
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

  const totalSaved = goals.reduce((sum, g) => sum + (g.savedAmount || 0), 0)
  const completedGoals = goals.filter(g => (g.savedAmount || 0) >= (g.targetAmount || 0)).length

  if (loading) return <div className="text-center text-gray-400 py-8">Loading...</div>
  if (error) return <div className="text-center text-red-400 py-8">{error}</div>

  return (
    <div className='dashboard flex flex-col items-center justify-start p-4 bg-inherit min-h-screen w-screen text-white'>
      <div className="dashboardHeader flex flex-col items-center justify-start w-full h-[60px] mb-4">
        <h1 className='text-[28px] font-semibold flex items-center justify-left w-full h-full'>
          <MdDashboard className='inline-block mr-2 text-[32px]' />
          Dashboard
        </h1>
      </div>

      {/** New Goal Button to trigger form  to create new Goals*/}
      <div className="newGoalDiv w-full h-[50px] flex flex-row items-center justify-between px-4 bg-black/50 rounded-lg mb-4">
        <button
          className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#e14546] rounded-md group"
          onClick={() => setShowGoalForm(true)}
        >
          <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#b32c2d] rounded group-hover:-mr-4 group-hover:-mt-4">
            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
          </span>
          <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#b32c2d] rounded group-hover:-ml-4 group-hover:-mb-4">
            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
          </span>
          <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#e14546] rounded-md group-hover:translate-x-0"></span>
          <span className="relative w-full flex items-center justify-center text-white transition-colors duration-200 ease-in-out group-hover:text-white">
            <MdAdd className="inline-block mr-2 text-[14px]" />
            New Goal
          </span>
        </button>
      </div>

      <div className="headerGoalsView">
        <h1 className="text-[28px] font-semibold mb-6">Goals Overview</h1>
      </div>

      {/* Summary Section for goals created more like a track overview*/}
      <div className="summary w-full flex flex-row items-center justify-around bg-black/40 rounded-lg py-4 mb-6">
        <div className="flex flex-col items-center border-r border-gray-700 pr-4">
          <span className="text-lg font-bold">{goals.length}</span>
          <span className="text-xs text-gray-300">Total Goals</span>
        </div>
        <div className="flex flex-col items-center border-r border-gray-700 px-4">
          <span className="text-lg font-bold">${Number(totalSaved).toLocaleString()}</span>
          <span className="text-xs text-gray-300">Total Saved</span>
        </div>
        <div className="flex flex-col items-center border-r border-gray-700 px-4">
          <span className="text-lg font-bold">{completedGoals}</span>
          <span className="text-xs text-gray-300">Completed</span>
        </div>
      </div>

      {/* Goals List displaying all created goals */}
      <div className="goalsList w-full max-w-2xl flex flex-col gap-4">
        {/* with conditional rendering for empty state*/}
        {goals.length === 0 ? (
          <div className="text-center text-gray-400 py-8 flex flex-col">
            <MdGpsFixed className="inline-block mr-2 text-[32px]" />
            No goals yet. Click "New Goal" to get started!
          </div>
        ) : (
          goals.map(goal => {
            const target = goal.targetAmount !== undefined && goal.targetAmount !== null ? Number(goal.targetAmount) : 0;
            const saved = goal.savedAmount !== undefined && goal.savedAmount !== null ? Number(goal.savedAmount) : 0;
            const percent = target > 0 ? Math.round((saved / target) * 100) : 0;
            return (
              <div key={goal.id} className="goalCard bg-black/60 rounded-lg p-4 flex flex-col md:flex-row 
              md:items-center md:justify-between border border-gray-700 hover:bg-black/70 transition-colors duration-200">
                <div>
                  <div className="font-semibold text-lg">{goal.name}</div>
                  <div className="text-xs text-gray-400">{goal.category} &middot; Target: ${target.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Deadline: {goal.deadline}</div>
                </div>
                <div className="flex flex-col items-end mt-2 md:mt-0">
                  <span className="text-sm">Saved: <span className="font-bold">${saved.toLocaleString()}</span></span>
                  <span className="text-xs text-gray-400">
                    {percent}% complete
                  </span>
                  {/* Progress Bar */}
                  <div className="w-40 h-2 bg-gray-700 rounded mt-2 overflow-hidden">
                    <div
                      className="h-full rounded transition-all duration-300"
                      style={{
                        width: `${Math.min(100, target > 0 ? (saved / target) * 100 : 0)}%`,
                        background: (saved >= target)
                          ? '#22c55e' // green for complete
                          : (target > 0 && (saved / target) > 0.7)
                            ? '#eab308' // yellow for >70%
                            : '#e14546' // red for <70%
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Goal Form displayed on click of New Goal button  enabling the creation of new goals */}
      {showGoalForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-2 py-4">
          <div className="relative bg-black rounded-lg shadow-lg w-full max-w-lg mx-auto p-4 sm:p-6 
          text-white flex flex-col">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-[#e14546] text-2xl font-bold z-10"
              onClick={() => setShowGoalForm(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-[#e14546]">Create New Goal</h2>
            <GoalCard
              onSubmit={async goal => {
                // POST to API
                const res = await fetch(API_URL, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ ...goal, createdAt: new Date().toISOString() })
                })
                if (res.ok) {
                  const newGoal = await res.json()
                  setGoals([...goals, newGoal])
                }
                setShowGoalForm(false)
              }}
              onCancel={() => setShowGoalForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}