"use client"

import React, { useState } from 'react'
import Navigation from './components/navigation'
import Dev from './components/dev'
import Dash from './components/dash'

function page() {
    const [isDev, setIsDev] = useState<boolean>(true)

    const handleDev = () => {
        setIsDev(!isDev)
    }
    return (
        <div>
            <Navigation handleDev={handleDev} isDev={isDev}/>
            {
                isDev? <Dev/> : <Dash/>
            }
        </div>
    )
}

export default page
