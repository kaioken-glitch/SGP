import React, { useState } from 'react'

// Categories as per README
const GOAL_CATEGORIES = [
  'Travel', 'Emergency', 'Electronics', 'Real Estate', 'Vehicle',
  'Education', 'Shopping', 'Retirement', 'Home', 'Health', 'Entertainment'
]

// Props: onSubmit, initialData (for edit), onCancel
export default function GoalCard({ onSubmit, initialData = {}, onCancel }) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    targetAmount: initialData.targetAmount || '',
    savedAmount: initialData.savedAmount || '',
    category: initialData.category || '',
    deadline: initialData.deadline || '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.targetAmount || isNaN(form.targetAmount) || Number(form.targetAmount) <= 0) errs.targetAmount = 'Target amount must be a positive number.'
    if (form.savedAmount && (isNaN(form.savedAmount) || Number(form.savedAmount) < 0)) errs.savedAmount = 'Saved amount must be 0 or more.'
    if (!form.category) errs.category = 'Category is required.'
    if (!form.deadline) errs.deadline = 'Deadline is required.'
    return errs
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      onSubmit && onSubmit({ ...form, targetAmount: Number(form.targetAmount), savedAmount: Number(form.savedAmount) || 0 })
    }
  }

  return (
    <form className="w-[450px] h-[550px] flex flex-col gap-4" onSubmit={handleSubmit}>

      <div className='w-full flex flex-col items-center justify-start'>
        <label className="block text-sm font-medium mb-1 mr-[auto]">Goal Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none 
          focus:border-[#e14546] text-white"
        />
        {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
      </div>

      <div className='w-full flex flex-col items-center justify-start'>
        <label className="block text-sm font-medium mb-1 mr-[auto]">Target Amount ($)</label>
        <input
          type="number"
          name="targetAmount"
          value={form.targetAmount}
          onChange={handleChange}
          min="1"
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none 
          focus:border-[#e14546] text-white placeholder:text-gray-400"
        />
        {errors.targetAmount && <div className="text-xs text-red-500 mt-1">{errors.targetAmount}</div>}
      </div>

      <div className='w-full flex flex-col items-center justify-start'>
        <label className="block text-sm font-medium mb-1 mr-[auto]">Initial Saved Amount ($)</label>
        <input
          type="number"
          name="savedAmount"
          value={form.savedAmount}
          onChange={handleChange}
          min="0"
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none 
          focus:border-[#e14546] text-white placeholder:text-gray-400"
        />
        {errors.savedAmount && <div className="text-xs text-red-500 mt-1">{errors.savedAmount}</div>}
      </div>

      <div className='w-full flex flex-col items-center justify-start'>
        <label className="block text-sm font-medium mb-1 mr-[auto]">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none 
          focus:border-[#e14546] text-white placeholder:text-gray-400 bg-black"
        >
          <option value="">Select a category</option>
          {GOAL_CATEGORIES.map(cat => (
            <option key={cat} value={cat} className='bg-black text-white'>{cat}</option>
          ))}
        </select>
        {errors.category && <div className="text-xs text-red-500 mt-1">{errors.category}</div>}
      </div>

      <div className='w-full flex flex-col items-center justify-start'>
        <label className="block text-sm font-medium mb-1 mr-[auto]">Deadline</label>
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none
          focus:border-[#e14546] text-white placeholder:text-gray-400"
        />
        {errors.deadline && <div className="text-xs text-red-500 mt-1">{errors.deadline}</div>}
      </div>

      <div className="w-full flex flex-row justify-center gap-10 mt-2">
        <button type="submit" className="bg-[#e14546] text-white px-4 py-2 rounded 
        hover:bg-[#b32c2d] transition-colors text-[14px]">Save Goal</button>
        {onCancel && (
          <button type="button" className="bg-black text-white px-4 py-2 rounded 
          hover:bg-gray-950 transition-colors border-[1px] border-gray-400/20
          text-[14px] cursor-pointer" 
          onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  )
}
