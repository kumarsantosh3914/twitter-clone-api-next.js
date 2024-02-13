import { connectToDB } from "@/app/utils";
import prisma from "../../../../prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectToDB();

    const tweets = await prisma.tweets.findMany();
    return NextResponse.json({ tweets }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.messsage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  try {
    const { tweet, userId } = await req.json();

    if (!tweet && userId) {
      return NextResponse.json({ error: "Invalid Data" }, { status: 422 });
    }

    await connectToDB();
    const user = await prisma.user.findFirst({where: {id: userId}});
    if(!user) {
      return NextResponse.json({message: "Invalid User"}, {status: 401});
    }

    const newTweet = await prisma.tweets.create({data: {tweet, userId}});
    return NextResponse.json({ tweet: newTweet }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.messsage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
