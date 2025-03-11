import connectMongo from "@/libs/mongoose";
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import Board from "@/models/Board";
import { auth } from "@/auth";

export async function POST(req) {
  const body = await req.json();
  if (!body.boardId || !body.title || !body.name || !body.description) {
    return NextResponse.json(
      { error: "The board's name is required" },
      { status: 400 }
    );
  }
  try {
    await connectMongo();
    const session = await auth();
    const board = await Board.findById(body.boardId);
    const new_post = await Post.create({
      boardId: body.boardId,
      title: body.title,
      content: body.content,
      numberOfVotes: 0,
      userId: session?.user?.id,
    });
    board.push(new_post);
    board.save();
    return NextResponse.json(new_post);
  } catch (e) {
    return NextResponse.json({
      error: e.message || "Some error ?",
      status: 500,
    });
  }
}
