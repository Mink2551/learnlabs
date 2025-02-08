import React from 'react';
import { IoIosSearch } from "react-icons/io";

function SearchBar() {
  return (
    <div className='w-fit mx-auto mt-5 relative'>
      <div className='w-[90vw] max-w-[400px] h-[40px] flex items-center bg-gray-700 rounded-2xl relative'>
        <input
          type="text"
          className='border-2 w-[98%] mx-auto h-[80%] px-4 rounded-xl bg-gray-800 text-white focus:outline-none'
          placeholder="Search..."
        />
        <div className='absolute right-0.5 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-gray-600 duration-100 bg-white h-[30px] w-[30px] flex items-center justify-center text-2xl rounded-full'>
          <IoIosSearch className="text-gray-700" />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
