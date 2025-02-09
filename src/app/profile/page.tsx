"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Banner from './components/banner';



function Page() {
    const { data: session } = useSession();
    const router = useRouter();
    

    useEffect(() => {
        if (!session) {
            router.replace('/login');
        }
    }, [session, router]);

    

    return (
        <div >
            {/* Banner */}
           <Banner/> 
        </div>
    );
}

export default Page;
