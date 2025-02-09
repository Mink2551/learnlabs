import React from 'react'
import { FaDev } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

function navigation({handleDev, isDev}: {handleDev:() => void, isDev:boolean}) {
  return (
    <div className='mt-10 flex justify-center'>
      <ul className='flex gap-4 text-xl justify-center w-[50%] font-medium '>
        <li onClick={handleDev} className={`border-b-2 cursor-pointer min-w-[150px] w-[50%] flex justify-center duration-200 py-2 ${isDev? "border-gray-200 text-gray-200 -translate-y-2" : "border-gray-500 text-gray-500"}`}>Development<FaDev className='mt-1.5 ml-1'/></li>
        <li onClick={handleDev} className={`border-b-2 cursor-pointer min-w-[150px] w-[50%] flex justify-center duration-200 py-2 ${isDev? "border-gray-500 text-gray-500" : "border-gray-200 text-gray-200 -translate-y-2"}`}><RxDashboard className='mt-1.5 mr-1'/>Dashboard</li>
      </ul>
    </div>
  )
}

export default navigation
