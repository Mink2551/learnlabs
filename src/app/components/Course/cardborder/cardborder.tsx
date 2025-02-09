import React, { useState, useEffect, useRef } from "react";
import { Card } from "../card/Card"; // Assuming Card is a reusable component
import { ChevronLeft, ChevronRight } from "lucide-react"; // For icon buttons

interface Course {
    id: string;
    title: string;
    description: string;
    tier: string;
    type: string;
}

interface CardBorderProps {
    isAll: boolean;
    searchTerm: string;
}

function CardBorder({ isAll, searchTerm }: CardBorderProps) {
    const [data, setData] = useState<Course[]>([]);
    const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({}); // Store ref by `type`

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/course/get`);
                if (!res.ok) throw new Error("Failed to fetch data");
                const courses: Course[] = await res.json();
                setData(courses);
            } catch (e) {
                console.log("Error:", e);
            }
        };

        fetchCourse();
    }, []);

    // Filter courses based on search term
    const filteredData = data.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group the data by `type`
    const groupedCourses = filteredData.reduce<Record<string, Course[]>>((acc, course) => {
        if (!acc[course.type]) acc[course.type] = [];
        acc[course.type].push(course);
        return acc;
    }, {});

    const scrollLeft = (type: string) => {
        if (scrollRefs.current[type]) {
            scrollRefs.current[type]!.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = (type: string) => {
        if (scrollRefs.current[type]) {
            scrollRefs.current[type]!.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="ml-5 mt-10">
            <h1 className="font-bold mb-5 text-white text-xl">Photo Course</h1>
            <div className="flex flex-col gap-y-20 gap-5">
                {Object.entries(groupedCourses).map(([type, courses]) => (
                    <div key={type}>
                        <div className="border max-w-[1300px] mx-auto border-white rounded-xl p-5">
                            <h2 className="text-white font-bold text-lg mb-3">{type}</h2>
                            <div className="relative">
                                {courses.length > 4 && (
                                    <button
                                        className="absolute left-0 z-10 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-600"
                                        onClick={() => scrollLeft(type)}
                                    >
                                        <ChevronLeft size={24} color="white" />
                                    </button>
                                )}
                                <div
                                    ref={(el) => { scrollRefs.current[type] = el; }}
                                    className="flex gap-5 overflow-x-scroll no-scrollbar scroll-smooth"
                                >
                                    {courses.map((course, index) => (
                                        <Card
                                            key={index}
                                            tier={course.tier}
                                            head={course.title}
                                            type={course.type}
                                            content={course.description}
                                            id={course.id}
                                        />
                                    ))}
                                </div>
                                {courses.length > 4 && (
                                    <button
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-600"
                                        onClick={() => scrollRight(type)}
                                    >
                                        <ChevronRight size={24} color="white" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {isAll && (
                    <div className="mt-10">
                        <h2 className="text-white font-bold max-w-[1300px] mx-auto text-xl mb-3">All Courses</h2>
                        <div className="flex flex-wrap max-w-[1300px] mx-auto gap-5">
                            {filteredData.map((course, index) => (
                                <div key={index} className="flex w-fit mx-auto">
                                    <Card
                                        tier={course.tier}
                                        head={course.title}
                                        type={course.type}
                                        content={course.description}
                                        id={course.id}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CardBorder;
