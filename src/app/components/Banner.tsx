import { useState, useEffect, JSX } from "react";
import Link from "next/link";

function Banner() {
    const [page, setPage] = useState<number>(1);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsTransitioning(true);
            setPage((prevPage) => (prevPage === 4 ? 1 : prevPage + 1));
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (isTransitioning) {
            setTimeout(() => setIsTransitioning(false), 500); // Allow time for animation
        }
    }, [isTransitioning]);

    const Banner_1 = (): JSX.Element => {
        return <div className="banner-item">
                    <div className="h-[100%] w-[100vw] banner-bg-1 absolute"></div>
                    <div className="z-10 w-[100vw] p-7 relative h-[100%]">
                        <h1 className="font-bold text-white text-[5vh]">SC LearnLabs</h1>
                        <p className="ml-3 mt-2 min-w-[300px] max-w-[50%] text-[2vh] text-gray-400 font-medium">Learning Platform high Program Photo, Media, Graphic, Live, Data, Network</p>
                        <Link href='/course' className="justify-center items-center flex hover:bg-yellow-700 hover:scale-110 hover:font-bold duration-100 bg-yellow-600 absolute bottom-7 text-white font-medium w-[10%] min-w-[150px] rounded-md min-h-[40px] text-xl">Course</Link>
                        <div className="absolute right-5 bottom-2 text-[10vh] h-fit text-white"><span className="font-bold">.</span>...</div>
                    </div>
                </div>;
    };

    const Banner_2 = (): JSX.Element => {
        return <div className="banner-item">
                    <div className="h-[100%] w-[100vw] banner-bg-2 absolute"></div>
                    <div className="z-10 w-[100vw] p-7 relative h-[100%]">
                        <h1 className="font-bold text-white text-[5vh]">SC WorkLabs</h1>
                        <p className="ml-3 mt-2 min-w-[300px] max-w-[50%] text-[2vh] text-gray-400 font-medium">Working Platform fast connection. Work space for Photo editor, Media editor, Graphic Designer, LiveMan and Fullstack</p>
                        <Link href='#' className="justify-center items-center flex hover:bg-yellow-700 hover:scale-110 hover:font-bold duration-100 bg-yellow-600 absolute bottom-5 text-white font-medium w-[10%] min-w-[150px] rounded-md min-h-[40px] text-xl">Work side</Link>
                        <div className="absolute right-5 bottom-2 text-[10vh] h-fit text-white">.<span className="font-bold">.</span>..</div>
                    </div>
                </div>;
    };

    const Banner_3 = (): JSX.Element => {
        return <div className="banner-item">
                    <div className="h-[100%] w-[100vw] banner-bg-3 absolute"></div>
                    <div className="z-10 w-[100vw] p-7 relative h-[100%]">
                        <h1 className="font-bold text-white text-[5vh]">Documents</h1>
                        <p className="ml-3 mt-2 min-w-[300px] max-w-[50%] text-[2vh] text-gray-400 font-medium">LearnLabs Structure and Diagram, Flowchart. Level & Class Explanations</p>
                        <Link href='/docs' className="justify-center items-center flex hover:bg-yellow-700 hover:scale-110 hover:font-bold duration-100 bg-yellow-600 absolute bottom-7 text-white font-medium w-[10%] min-w-[150px] rounded-md min-h-[40px] text-xl">Read</Link>
                        <div className="absolute right-7 bottom-2 text-[10vh] h-fit text-white">..<span className="font-bold">.</span>.</div>
                    </div>
                </div>;
    };

    const Banner_4 = (): JSX.Element => {
        return <div className="banner-item">
                    <div className="h-[100%] w-[100vw] banner-bg-4 absolute"></div>
                    <div className="z-10 w-[100vw] p-7 relative h-[100%]">
                        <h1 className="font-bold text-white text-[5vh]">TestLabs</h1>
                        <p className="ml-3 mt-2 min-w-[300px] max-w-[50%] text-[2vh] text-gray-400 font-medium">Test Platform for Promoting Classes to Photo editor, Media editor, Graphic Designer, LiveMan, Fullstack</p>
                        <Link href='/test' className="justify-center items-center flex hover:bg-yellow-700 hover:scale-110 hover:font-bold duration-100 bg-yellow-600 absolute bottom-7 text-white font-medium w-[10%] min-w-[150px] rounded-md min-h-[40px] text-xl">Tests</Link>
                        <div className="absolute right-5 bottom-2 text-[10vh] h-fit text-white">...<span className="font-bold">.</span></div>
                    </div>
                </div>;
    };

    return (
        <div className="h-[500px] max-h-[40vh] overflow-hidden relative ">
            <div
                className={`flex h-full absolute transition-all duration-500 ease-in-out ${
                    isTransitioning ? "transforming" : ""
                }`}
                style={{
                    transform: `translateX(-${(page - 1) * 25}%)`,
                }}
            >
                <div className="w-[100vw]">{<Banner_1 />}</div>
                <div className="w-[100vw]">{<Banner_2 />}</div>
                <div className="w-[100vw]">{<Banner_3 />}</div>
                <div className="w-[100vw]">{<Banner_4 />}</div>
            </div>
        </div>
    );
}

export default Banner;
