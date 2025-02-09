// pages/api/course.js
import {prisma} from '../../../../../lib/prisma'
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { title, description, courseType, courseTier } = await req.json();

        const newCourse = await prisma.course.create({
            data: { 
                title, 
                description, 
                type: courseType, 
                tier: courseTier 
            },
        });

        return NextResponse.json({ courseId: newCourse.id }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "ไม่สามารถเพิ่มคอร์สได้" }, { status: 500 });
    }
}
