
import React, { useState, useEffect } from 'react'
import { MdEdit, MdDelete, MdGpsFixed } from 'react-icons/md'
import GoalCard from './GoalCard'

const API_URL = 'https://sgp-backend-8fvy.onrender.com/goals'


export default function Goals() {
  const [goals, setGoals] = useState([])
  const [editGoal, setEditGoal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all goals
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

  // Create or update goals
  const handleSave = async (goal) => {
    if (editGoal) {
      // Update (PUT)
      const res = await fetch(`${API_URL}/${editGoal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editGoal, ...goal })
      })
      if (res.ok) {
        setGoals(goals.map(g => g.id === editGoal.id ? { ...editGoal, ...goal } : g))
        setEditGoal(null)
      }
    } else {
      // Create (POST)
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...goal, createdAt: new Date().toISOString() })
      })
      if (res.ok) {
        const newGoal = await res.json()
        setGoals([...goals, newGoal])
      }
    }
  }

  // Delete goal
  const handleDelete = async (goalId) => {
    const res = await fetch(`${API_URL}/${goalId}`, { method: 'DELETE' })
    if (res.ok) {
      setGoals(goals.filter(g => g.id !== goalId))
    }
  }

  if (loading) return <div className="text-center text-gray-400 py-8">Loading...</div>
  if (error) return <div className="text-center text-red-400 py-8">{error}</div>

  return (
    <div className="goalsPage flex flex-col items-center justify-start p-4 bg-inherit min-h-screen w-screen text-white">
      <div className="goalsHeader flex flex-col items-center justify-start w-full h-[60px] mb-4">
        <h1 className="text-[28px] font-semibold flex items-center w-full h-full">
          <MdGpsFixed className="inline-block mr-2 text-[32px]" />
          Goals
        </h1>
      </div>


      {/** Goals List displaying all created goals mapping through the <GoalCard /> component and data fetched from the API */}
      <div className="goalsList w-full max-w-2xl flex flex-col gap-4">
        {goals.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <MdGpsFixed className="inline-block mr-2 text-[32px]" />
            No goals yet. Click "New Goal" on the Dashboard to get started!
          </div>
        ) : (
          goals.map(goal => (
            <div
              key={goal.id}
              className="goalCard bg-black/60 rounded-lg p-4 flex flex-col gap-4 sm:gap-0 sm:flex-col md:flex-row md:items-center md:justify-between border border-gray-700 hover:bg-black/70 transition-colors duration-200 w-full"
            >
              <div className="flex flex-col gap-1 w-full md:w-auto">
                <div className="font-semibold text-base sm:text-lg flex items-center break-words">
                  <MdGpsFixed className="inline-block mr-2 text-[#e14546] text-lg sm:text-xl" />
                  <span className="truncate max-w-[180px] sm:max-w-none">{goal.name}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {goal.category} &middot; Target: $
                  {(goal.targetAmount !== undefined && goal.targetAmount !== null ? Number(goal.targetAmount).toLocaleString() : '0')}
                </div>
                <div className="text-xs text-gray-400">
                  Deadline: {goal.deadline}
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-end gap-2 mt-2 md:mt-0 w-full md:w-auto">
                <div className="flex flex-col items-start sm:items-end w-1/2 sm:w-auto">
                  <span className="text-sm">
                    Saved: <span className="font-bold">$
                      {(goal.savedAmount !== undefined && goal.savedAmount !== null ? Number(goal.savedAmount).toLocaleString() : '0')}
                    </span>
                  </span>
                  <span className="text-xs text-gray-400">
                    {goal.targetAmount && goal.savedAmount !== undefined && goal.savedAmount !== null && goal.targetAmount !== 0
                      ? Math.round((Number(goal.savedAmount) / Number(goal.targetAmount)) * 100)
                      : 0
                    }% complete
                  </span>
                </div>
                <div className="flex gap-2 mt-0 sm:mt-2 w-1/2 sm:w-auto justify-end">
                  <button
                    className="p-2 rounded bg-[#e14546] text-white hover:bg-[#b32c2d] transition-colors"
                    onClick={() => setEditGoal(goal)}
                    title="Edit"
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="p-2 rounded bg-gray-700 text-white hover:bg-red-700 transition-colors"
                    onClick={() => handleDelete(goal.id)}
                    title="Delete"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Edit/Create form that is displayed on click of New Goal button enabling the creation of new goals */}
      {editGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-2 py-4">
          <div className="relative bg-black rounded-lg shadow-lg w-full max-w-lg mx-auto p-4 sm:p-6 
          text-white flex flex-col">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-[#e14546] text-2xl font-bold z-10"
              onClick={() => setEditGoal(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-[#e14546]">Edit Goal</h2>
            <GoalCard
              initialData={editGoal}
              onSubmit={goal => handleSave(goal)}
              onCancel={() => setEditGoal(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}