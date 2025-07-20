import React, { useState } from 'react'
import './App.css'
import Main from './components/Main'
import Header from './components/Header'
import HeaderMobile from './components/HeaderMobile'
import Dashboard from './components/Dashboard'
import GoalForm from './components/GoalForm'
import Analytics from './components/Analytics'
import { useViewport } from './components/useViewPort'

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { isMobile } = useViewport()

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard setCurrentPage={setCurrentPage} />
      case 'goals': return <GoalForm/>
      case 'analytics': return <Analytics/>
      default: return <Dashboard setCurrentPage={setCurrentPage} />
    }
  }

  const renderHeader = () => {
    return isMobile 
      ? <HeaderMobile setCurrentPage={setCurrentPage} currentPage={currentPage} />
      : <Header setCurrentPage={setCurrentPage} currentPage={currentPage} />
  }

  return (
    <div className="app">
      {renderHeader()}
      <Main className="main-container overflow-y-auto overflow-hidden">
        {renderPage()}
      </Main>
    </div>
  )
}
