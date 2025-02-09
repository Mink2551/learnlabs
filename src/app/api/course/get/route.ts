import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
    try {
        const data = await prisma.course.findMany({
            orderBy: {
                createdAt: "asc", // เรียงจากใหม่ไปเก่า
            },
        });

        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
