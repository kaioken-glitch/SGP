import React from 'react'

export default function Main({ children, className }) {
  return (
    <main className={`main ${className || ''}`}>
      {children}
    </main>
  )
}
