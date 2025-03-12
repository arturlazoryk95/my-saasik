import FormAddPost from "@/components/FormAddPost";
import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";
import { redirect } from "next/navigation";
import Post from "@/models/Post";
import CardPost from "@/components/CardPost";

// 14:15

const getData = async (boardId) => {
  await connectMongo();

  const board = await Board.findById(boardId);
  const posts = await Post.find({ boardId: board._id }).sort({ createdAt: -1 });
  if (!board) {
    redirect("/");
  }

  return {
    board,
    posts,
  };
};

async function PublicBoard(props) {
  const { board, posts } = await getData(props.params.boardId);

  return (
    <main className="max-w-5xl bg-base-200 mx-auto">
      <div>{board.name} (public)</div>
      <div className="flex gap-6 ">
        <FormAddPost boardId={board._id} />
        <ul className="space-y-3">
          {posts.map((post) => {
            return <CardPost key={post._id} post={post} />;
          })}
        </ul>
      </div>
    </main>
  );
}

export default PublicBoard;
