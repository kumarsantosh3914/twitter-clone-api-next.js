import { connectToDB } from "@/app/utils";
import prisma from "../../../../prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        await connectToDB();
        const users = await prisma.user.findMany({include: {tweets: true, _count: true}});
        return NextResponse.json({users}, {status: 200});
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.messsage}, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
};


