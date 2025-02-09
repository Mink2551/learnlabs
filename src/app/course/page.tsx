"use client"

import React, { useState } from 'react'
import CardBorder from '../components/Course/cardborder/cardborder'
import SearchBar from '../components/searchbar';

function page() {
    const [searchTerm, setSearchTerm] = useState("");
  

    return (
      <div>
        <SearchBar onSearch={setSearchTerm}/>
        <CardBorder isAll={false} searchTerm={searchTerm}/>
      </div>
    )
}

export default page
