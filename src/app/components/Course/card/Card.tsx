"use client"

import React from "react";
import Link from "next/link";

export const Card = (
    { tier, head, type, content, id }:
    { tier: string, head: string, type: string, content: string, id: string }
) => {
    return (
        <div className='w-[300px] flex-shrink-0 duration-300 scale-95 hover:scale-100 relative rounded-2xl h-[400px] bg-gray-700'>
            {/* Header */}
            <div className={`h-[50%] flex justify-center items-center shadow-md rounded-t-xl
                    ${
                        type === "PHOTO" ? "shadow-red-600 bg-red-600" :
                        type === "MEDIA" ? "shadow-blue-600 bg-blue-600" :
                        type === "GRAPHIC" ? "shadow-purple-600 bg-purple-600" :
                        type === "DATA" ? "shadow-green-600 bg-green-600" :
                        type === "NETWORK" ? "shadow-pink-600 bg-pink-600" :
                        type === "LIVE" ? "shadow-orange-600 bg-orange-600" : 
                        "shadow-yellow-600 bg-yellow-600"
                    }
                `}>
                <h1 className='font-bold text-white shadow-lg shadow-white border-2 px-4 py-2 rounded-full text-3xl'>{tier}</h1>
            </div>
            {/* Body */}
            <div className='h-[50%] text-white overflow-hidden p-5'>
                <div className='flex justify-between'>
                    <h1 className='font-bold'>{head}</h1>
                    <p className='photo-bg items-center flex rounded-lg px-2 text-sm font-bold'>{type}</p>
                </div>
                <p className='text-gray-400 h-[80px] overflow-hidden mt-2 text-sm'>{content}</p>

                <hr className='border-red-500 absolute bottom-16 w-[90%] flex left-[50%] translate-x-[-50%]'/>

                <div className='flex justify-between'>
                    <p className='absolute bottom-5 text-red-500 font-bold'>0% Complete</p>
                    <Link href={`/learning/${id}`}>
                        <button 
                            className='hover:scale-105 hover:bg-red-500 hover:bg-opacity-20 hover:border-red-300 duration-300 absolute bottom-5 right-5 text-red-500 border rounded-3xl px-6 border-red-500 font-medium py-0.5'>
                            Learn
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
