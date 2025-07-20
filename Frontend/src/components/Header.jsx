import React from 'react'
import logo from '../assets/logo.svg'
import { MdDashboard, MdGpsFixed, MdPieChart } from 'react-icons/md'

export default function Header({setCurrentPage, currentPage}) {
    return (
        <header className='header flex flex-row justify-center items-center 
        p-4 bg-black text-white w-[100%] h-[80px] border-b-[1px] 
        border-gray-200/20 '>
            <button className='logo w-[120px] h-[auto] ml-[20px] mr-[auto]' onClick={() => 
                setCurrentPage('dashboard')}>
                <img src={logo} alt="SGPlogo" />
            </button>

            <nav className='flex flex-row items-center justify-center gap-4 ml-4'>
                <button onClick={() => setCurrentPage('dashboard')} 
                className={`hover:text-primary transition-colors flex flex-row items-center gap-2 text-[14px] cursor-pointer ${
                    currentPage === 'dashboard' ? 'text-[#e14545] font-semibold' : 'text-white'
                }`}>
                <MdDashboard className="w-4 h-4" />
                Dashboard
                </button>
                <button onClick={() => setCurrentPage('goals')} 
                    className={`hover:text-primary transition-colors flex flex-row items-center gap-2 text-[14px] cursor-pointer ${
                        currentPage === 'goals' ? 'text-[#e14545] font-semibold' : 'text-white'
                    }`}>
                    <MdGpsFixed className="w-4 h-4" />
                    Goals
                </button>
                <button onClick={() => setCurrentPage('analytics')} 
                    className={`hover:text-primary transition-colors flex flex-row items-center gap-2 text-[14px] cursor-pointer ${
                        currentPage === 'analytics' ? 'text-[#e14545] font-semibold' : 'text=white'
                    }`}>
                    <MdPieChart className="w-4 h-4" />
                    Analytics
                </button>   
            </nav>
        </header>
    )
}
