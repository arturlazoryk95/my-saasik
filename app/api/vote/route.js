import connectMongo from "@/libs/mongoose";
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import Board from "@/models/Board";
import { auth } from "@/auth";

import { Filter } from "bad-words";

export async function POST(req) {
  const body = await req.json();

  try {
    await connectMongo();

    const post = await Post.findById(body.postId);
    post.numberOfVotes += 1;
    await post.save();

    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({
      error: e?.message || "Some error ?",
      status: 500,
    });
  }
}
