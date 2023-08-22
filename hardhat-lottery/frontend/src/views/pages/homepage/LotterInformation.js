import React from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from '../../../configs/Funtions';
import RecentWinner from './RecentWinner';

const LotterInformation = () => {

    const totalParticipants = useSelector(state => state.contractData.participants)

    
  return (
    <>
    <div className="mt-5">
    <RecentWinner/>
    </div>
    {!isEmpty(totalParticipants) && <div className="mt-5">
          
      <ul className="space-y-1">
      <h1 className="text-xl text-white font-semibold mb-4 mt-10">All Participants</h1>
        
        {totalParticipants.map((address, index) => (
          <li key={index} className="bg-white shadow-md rounded p-4">
            <span className="font-semibold break-words">{address}</span> 
          </li>
        ))}
      </ul>
    </div>}
    </>
  )
}

export default LotterInformation