import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({isAuthenticated}) => {
  return (

<header className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">BlackMarket</h1>
    {!isAuthenticated && (
      <div>
        <Link to='/login' className="bg-blue-500 px-4 py-2 mr-2 rounded">Sign In</Link>
        <Link to='/' className="bg-green-500 px-4 py-2 rounded">Sign Up</Link>
      </div>
    )}
  </header>
  )
}

export default Header