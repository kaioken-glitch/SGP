import React, { useState } from 'react'
import { MdDashboard, MdGpsFixed, MdPieChart, MdMenu, MdClose } from 'react-icons/md'
import logo from '../assets/logo.svg'

export default function HeaderMobile({ setCurrentPage, currentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdDashboard },
    { id: 'goals', label: 'Goals', icon: MdGpsFixed },
    { id: 'analytics', label: 'Analytics', icon: MdPieChart }
  ]

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId)
    setIsMenuOpen(false)
  }

  return (
    <header className="header w-full px-4 py-3 bg-black">
      <div className="flex items-center justify-between">
        <div className="logo">
            <button onClick={() => setCurrentPage('dashboard')}>
                <img src={logo} alt="Smart Goal Planner Logo" className="h-10 w-auto max-w-[200px]" />
            </button>
        </div>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[white] text-xl focus:outline-none"
        >
          {isMenuOpen ? <MdClose className="w-6 h-6" /> : <MdMenu className="w-6 h-6" />}
        </button>
      </div>
      
      {isMenuOpen && (
        <nav className="mt-4 pb-4">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-3 px-4 py-3  transition-all duration-300 
                  border-b-2 text-white border-transparent text-left font-medium ${
                  currentPage === item.id 
                      ? 'border-b-2 border-white border-opacity-50 text-[#e14545]' 
                      : 'hover:border-b-2 hover:border-white hover:border-opacity-50 text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
