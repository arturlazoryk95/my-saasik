import connectMongo from "@/libs/mongoose";
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import Board from "@/models/Board";
import { auth } from "@/auth";

import { Filter } from "bad-words";

export async function POST(req) {
  const filter = new Filter();
  const body = await req.json();
  if (!body.boardId || !body.title || !body.content) {
    return NextResponse.json(
      { error: "The board's params r required" },
      { status: 400 }
    );
  }
  try {
    await connectMongo();
    const session = await auth();
    const board = await Board.findById(body.boardId);
    const new_post = await Post.create({
      boardId: body.boardId,
      title: filter.clean(body.title),
      content: filter.clean(body.content),
      numberOfVotes: 1,
      userId: session?.user?.id,
    });
    board.posts.push(new_post._id);
    await board.save();
    return NextResponse.json(new_post);
  } catch (e) {
    return NextResponse.json({
      error: e.message || "Some error ?",
      status: 500,
    });
  }
}
