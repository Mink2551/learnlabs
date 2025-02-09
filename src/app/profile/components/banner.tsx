import React, {useState, useEffect} from 'react'
import { MdOutlineAccountCircle, MdOutlineInsertPhoto, MdNetworkCheck } from "react-icons/md";
import { FaFileVideo } from "react-icons/fa6";
import { CgMediaLive } from "react-icons/cg";
import { TbChartInfographic } from "react-icons/tb";
import { AiFillDatabase } from "react-icons/ai";
import { LuFullscreen } from "react-icons/lu";
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Levels {
    photoLevel: number;
    mediaLevel: number;
    graphicLevel: number;
    networkLevel: number;
    dataLevel: number;
    liveLevel: number;
}

interface Classes {
    GRAPHIC: number;
    MEDIA: number;
    PHOTO: number;
    LIVEMAN: number;
    FULLSTACK: number;
}

interface Rank {
    newbie: boolean;
    senior: boolean;
    classId: number;
}

interface UserData {
    name: string;
    levels: Levels;
    email: string;
    role: string;
    class: Classes & { ClassRank: Rank[]; id: number };
}



function banner() {
    const { data: session } = useSession();

    const [levels, setLevels] = useState<Levels | null>(null);
    const [classes, setClasses] = useState<Classes | null>(null);
    const [data, setData] = useState<UserData | null>(null);
    
    const logout = () => {
        signOut();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!session?.user?.email) return;
                const res = await fetch(`/api/data/getuser?email=${encodeURIComponent(session.user.email)}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Fetch failed, please try again.');
                setLevels(data.levels || null);
                setClasses(data.class || null);
                setData(data);
            } catch (e) {
                console.error("Error fetching user data: ", e);
            }
        };
        fetchUser();
    }, [session]);

  return (
    <div className='min-w-[50vw] max-w-[90vw] h-[500px] overflow-hidden mx-auto mt-20 rounded-2xl'>
      <div className='h-[40%] relative w-[100%] bg-SC3 border-b-[10px] rounded-t-2xl'>
          <div className='bg-white w-fit z-10 text-[150px] text-gray-400 rounded-full absolute left-3 bottom-[-60px]'>
              <MdOutlineAccountCircle />
          </div>
          <div className='w-fit text-md font-medium text-white absolute left-5 top-5'>
              <h1>Username : {data?.name ?? 'N/A'}</h1>
              <p>Email : {data?.email ?? 'N/A'}</p>
              <p>Role : {data?.role ?? 'N/A'}</p>
          </div>
          <div className='absolute w-fit gap-2 right-5 bottom-3'>
              <button onClick={logout} className='bg-SC5 text-white px-4 py-2 rounded-md font-bold'>Logout</button>
          </div>
          {
            data?.role === 'ADMIN'? (
              <div className='absolute w-fit gap-2 right-5 top-5'>
                <Link href='/dashboard' className='bg-SC6 text-white px-2 py-1 rounded-md font-bold'>DashBoard</Link>
              </div>
            ) : ''
          }
      </div>

      <div className="relative overflow-scroll w-full h-[60%] bg-gray-800">
        <div className="flex min-w-max">
          <div className="flex flex-col w-[300px] gap-1 rounded-b-2xl">
            <h1 className="font-bold text-white pt-16 ml-6">Level :</h1>
            <p className="text-white ml-10 flex">
              <TbChartInfographic className="mt-1 mr-1 text-xl" />
              Graphic Level : {levels?.graphicLevel ?? 0}
            </p>
            <p className="text-white ml-10 flex">
              <FaFileVideo className="mt-1 mr-1 text-xl" />
              Media Level : {levels?.mediaLevel ?? 0}
            </p>
            <p className="text-white ml-10 flex">
              <MdOutlineInsertPhoto className="mt-1 mr-1 text-xl" />
              Photo Level : {levels?.photoLevel ?? 0}
            </p>
            <p className="text-white ml-10 flex">
              <CgMediaLive className="mt-1 mr-1 text-xl" />
              Live Level : {levels?.liveLevel ?? 0}
            </p>
            <p className="text-white ml-10 flex">
              <MdNetworkCheck className="mt-1 mr-1 text-xl" />
              Network Level : {levels?.networkLevel ?? 0}
            </p>
            <p className="text-white ml-10 flex">
              <AiFillDatabase className="mt-1 mr-1 text-xl" />
              Data Level : {levels?.dataLevel ?? 0}
            </p>
          </div>
          
          <div className="flex flex-col w-[300px] gap-1 rounded-b-2xl">
            <h1 className="font-bold text-white pt-16 ml-6">Classes :</h1>
            <p className="text-white ml-10 flex">
              <TbChartInfographic className="mt-1 mr-1 text-xl" />
              Graphic : {classes?.GRAPHIC ? "Pass" : "Not Pass"}
            </p>
            <p className="text-white ml-10 flex">
              <FaFileVideo className="mt-1 mr-1 text-xl" />
              Media : {classes?.MEDIA ? "Pass" : "Not Pass"}
            </p>
            <p className="text-white ml-10 flex">
              <MdOutlineInsertPhoto className="mt-1 mr-1 text-xl" />
              Photo : {classes?.PHOTO ? "Pass" : "Not Pass"}
            </p>
            <p className="text-white ml-10 flex">
              <CgMediaLive className="mt-1 mr-1 text-xl" />
              LiveMan: {classes?.LIVEMAN ? "Pass" : "Not Pass"}
            </p>
            <p className="text-white ml-10 flex">
              <LuFullscreen className="mt-1 mr-1 text-xl" />
              FullStack: {classes?.FULLSTACK ? "Pass" : "Not Pass"}
            </p>
          </div>
          
          <div className="flex flex-col w-[300px] gap-1 rounded-b-2xl">
            <h1 className="font-bold text-white pt-16 ml-6">Rank :</h1>
            <p className="text-white ml-6 flex">
              <TbChartInfographic className="mt-1 mr-1 text-xl" />
              {data?.class?.GRAPHIC ? (data.class.ClassRank?.find(rank => rank.classId === data.class.id)?.senior ? "Senior" : "Newbie") : "Not Pass"}
            </p>
            <p className="text-white ml-6 flex">
              <FaFileVideo className="mt-1 mr-1 text-xl" />
              {data?.class?.MEDIA ? (data.class.ClassRank?.find(rank => rank.classId === data.class.id)?.senior ? "Senior" : "Newbie") : "Not Pass"}
            </p>
            <p className="text-white ml-6 flex">
              <MdOutlineInsertPhoto className="mt-1 mr-1 text-xl" />
              {data?.class?.PHOTO ? (data.class.ClassRank?.find(rank => rank.classId === data.class.id)?.senior ? "Senior" : "Newbie") : "Not Pass"}
            </p>
            <p className="text-white ml-6 flex">
              <CgMediaLive className="mt-1 mr-1 text-xl" />
              {data?.class?.LIVEMAN ? (data.class.ClassRank?.find(rank => rank.classId === data.class.id)?.senior ? "Senior" : "Newbie") : "Not Pass"}
            </p>
            <p className="text-white ml-6 flex">
              <LuFullscreen className="mt-1 mr-1 text-xl" />
              {data?.class?.FULLSTACK ? (data.class.ClassRank?.find(rank => rank.classId === data.class.id)?.senior ? "Senior" : "Newbie") : "Not Pass"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default banner
