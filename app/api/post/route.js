import connectMongo from "@/libs/mongoose";
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import Board from "@/models/Board";
import { auth } from "@/auth";
import User from "@/models/User";

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

export async function DELETE(req) {
  try {
    const { postId } = await req.json();
    if (!postId) {
      return NextResponse.json(
        { error: "postId is required" },
        { status: 401 }
      );
    }

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
    await connectMongo();
    const post = await Post.findById(postId);
    const user = await User.findById(session?.user?.id);

    if (!user.boards.includes(post.boardId.toString())) {
      return NextResponse.json({ error: "not authorized" }, { status: 501 });
    }

    await Post.deleteOne({
      _id: postId,
    });

    return NextResponse.json({ message: "Post deleted." });
  } catch (e) {
    return NextResponse.json(
      {
        error: e.message,
      },
      { status: 500 }
    );
  }
}
