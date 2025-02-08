"use client"

import React, {useState, useEffect, JSX} from 'react'
import Logo from '../../../public/SCLogo.png'
import Image from 'next/image'
import Link from 'next/link'
import { CiLogin } from "react-icons/ci";
import { LuNotepadText } from "react-icons/lu";
import { GrTest, GrDocumentTest } from "react-icons/gr";
import { FaLaptopFile } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineMenuOpen, MdOutlineAccountCircle } from "react-icons/md";
import { useSession } from 'next-auth/react'

function Navbar() {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [isMenu, setIsMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const { data: session} = useSession()
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only runs on the client-side
      const handleResize = () => {
        setSize({ w: window.innerWidth, h: window.innerHeight });
        setIsMenu(window.innerWidth <= 900);
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // Initial call to set size on mount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleSidebar = ():void => {
    setIsOpen(!isOpen)
  }

  const Sidebar = (): JSX.Element => {
    return (
      <div className={`fixed top-0 left-0 h-screen w-80 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <button onClick={handleSidebar} className="absolute top-5 right-5 text-2xl">
          ✖
        </button>
        <h1 className="p-5 text-lg font-bold">Menu</h1>
        <div className='ml-4 grid gap-10'>
              <Link href='/course' className='hover:text-SC4 text-white duration-100 flex px-3 py-2 rounded-md'>
                <LuNotepadText className='items-center flex mt-1 text-xl mr-2'/>
                <h2 className='font-medium text-xl'>Course</h2>
              </Link>
          
              <Link href='/course' className='hover:text-SC4 text-white duration-100 flex px-3 py-2 rounded-md'>
                <GrDocumentTest className='items-center mt-1 flex text-xl mr-2'/>
                <h2 className='font-medium text-xl'>TestLabs</h2>
              </Link>
          
              <Link href='/course' className='hover:text-SC4 text-white duration-100 flex px-3 py-2 rounded-md'>
                <FaLaptopFile className='items-center flex mt-1 text-xl mr-2'/>
                <h2 className='font-medium text-xl'>Document</h2>
              </Link>
            </div>
          
            {
              session? (
                <Link href='/profile' className='flex w-fit ml-5 absolute bottom-10 mr-5 hover:bg-SC2 duration-100 bg-SC6 px-3 py-2 rounded-md'>
                  <MdOutlineAccountCircle className='items-center flex mt-0.5 text-2xl text-white mr-2'/>
                  <h2 className='font-medium text-lg text-white'>Profile</h2>
                </Link>
              ) : (
                <Link href='/login' className='flex w-fit ml-5 absolute bottom-10 mr-5 hover:bg-SC2 duration-100 bg-SC6 px-3 py-2 rounded-md'>
                  <CiLogin className='items-center flex mt-1.5 text-lg text-white mr-2'/>
                  <h2 className='font-medium text-lg text-white'>เข้าสู่ระบบ</h2>
                </Link>
              )
            }
      </div>
    );
  };
  

  return (
    <div className='sticky top-0 z-10'>
      {
        isMenu? (
          <div className='flex items-center min-h-[70px] bg-gray-800 z-20 rounded-b-md shadow-white shadow-md'>
            <Link href='/'>
              <div className='flex hover:scale-110 transition-all'>
                <Image src={Logo} className='ml-5' width={50} alt='Logo'></Image>
                <h1 className='flex text-2xl items-center ml-2 font-bold text-gray-500'>LearnLabs</h1>
                <GrTest className='mt-3 text-3xl text-gray-400 ml-2'/>
              </div>
            </Link>

            <div className={`absolute right-5 text-3xl text-white cursor-pointer transition-transform duration-300 `} onClick={handleSidebar}>
              {isOpen ? (
                <MdOutlineMenuOpen className="transition-transform duration-300 rotate-0" />
              ) : (
                <IoMdMenu className="transition-transform duration-300 rotate-180" />
              )}
              <Sidebar />
            </div>
          </div>
        ) : (
          <div className='flex items-center min-h-[70px] sticky top-0 bg-gray-800 z-20 rounded-b-md shadow-white shadow-md'>
            <Link href='/'>
              <div className='flex hover:scale-110 transition-all'>
                <Image src={Logo} className='ml-5' width={50} alt='Logo'></Image>
                <h1 className='flex text-2xl items-center ml-2 font-bold text-gray-500'>LearnLabs</h1>
                <GrTest className='mt-3 text-3xl text-gray-400 ml-2'/>
              </div>
            </Link>
          
          
            <div className='w-fit mx-auto flex gap-10'>
              <Link href='/course' className='hover:text-SC4 text-white duration-100 flex px-3 py-2 rounded-md'>
                <LuNotepadText className='items-center flex text-2xl mr-2'/>
                <h2 className='font-medium'>Course</h2>
              </Link>
          
              <Link href='/course' className='hover:text-SC4 text-white duration-100 flex px-3 py-2 rounded-md'>
                <GrDocumentTest className='items-center flex text-2xl mr-2'/>
                <h2 className='font-medium'>TestLabs</h2>
              </Link>
          
              <Link href='/course' className='hover:text-SC4 text-white duration-100 flex px-3 py-2 rounded-md'>
                <FaLaptopFile className='items-center flex mt-0.5 text-2xl mr-2'/>
                <h2 className='font-medium'>Document</h2>
              </Link>
            </div>
          
            

            {
              session? (
                <Link href='/profile' className='flex mr-5 hover:bg-SC2 duration-100 bg-SC6 px-3 py-2 rounded-md'>
                  <MdOutlineAccountCircle className='items-center flex mt-0.5 text-2xl text-white mr-2'/>
                  <h2 className='font-medium text-white'>Profile</h2>
                </Link>
              ) : (
                <Link href='/login' className='flex mr-5 hover:bg-SC2 duration-100 bg-SC6 px-3 py-2 rounded-md'>
                  <CiLogin className='items-center flex mt-0.5 text-2xl text-white mr-2'/>
                  <h2 className='font-medium text-white'>เข้าสู่ระบบ</h2>
                </Link>
              )
            }
          </div>
        )
      }
      
    </div>
  )
}

export default Navbar
