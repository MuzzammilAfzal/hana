"use client"
import React from 'react'

const GoToAdminButton = () => {
  return (
     <button onClick={() => window.location.href = '/admin/login'}
      className="w-full rounded-lg bg-blue-500 py-3  text-lg font-semibold text-white transition hover:bg-blue-600">
        Go to Admin Dashboard
          </button>
  )
}

export default GoToAdminButton