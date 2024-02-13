import { connectToDB } from "@/app/utils";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export const GET = async (req: Request, params: { params: { id: string } }) => {
  try {
    await connectToDB();
    const tweet = await prisma.tweets.findFirst({
      where: { id: params.params.id },
    });
    return NextResponse.json({ tweet }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.messsage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, params: { params: { id: string } }) => {
  try {
    // @ts-ignore
    const { tweet } = req.json();
    await connectToDB();
    const updatedTweet = await prisma.tweets.update({
      data: { tweet },
      where: { id: params.params.id },
    });
    return NextResponse.json({ updatedTweet }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.messsage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};


export const DELETE = async (req: Request, params: { params: { id: string } }) => {
    try {
      await connectToDB();
      const tweet = await prisma.tweets.delete({
        where: {id: params.params.id}
      });
      return NextResponse.json({ tweet }, { status: 200 });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.messsage }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };