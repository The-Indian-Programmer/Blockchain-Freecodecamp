import React from 'react'
import Participants from '../homepage/LotterInformation'
import { useHistory } from 'react-router-dom';
const Allfunders = () => {
  const history = useHistory();
  return (
    <div className='h-screen bg-gradient-to-r from-blue-500 to-purple-600 '>
      <div className='py-32 px-6'>
      <button
      className="flex items-center bg-blue-100 hover:bg-white text-dark font-semibold py-2 px-4 rounded-lg focus:outline-none"
      onClick={() => history.push("/")}
    >
      <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Go Back
    </button>
        <Participants/>
    </div>
    </div>
  )
}

export default Allfunders
