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
  const posts = await Post.find({ boardId: board._id }).sort({
    numberOfVotes: -1,
  });
  if (!board) {
    redirect("/");
  }

  return {
    board,
    posts,
  };
};

async function PublicBoard(props) {
  const { board, posts } = await getData(props.params.boardId.toString());

  return (
    <main className="min-h-screen bg-base-200">
      <section className="max-w-5xl mx-auto px-5">
        <div className=" text-lg font-bold p-5">{board.name}</div>
      </section>
      <section className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row gap-8 pb-12 items-start">
        {/* <div className="flex gap-6 "> */}
        <FormAddPost boardId={board._id.toString()} className="sticky" />
        <ul className="space-y-4 flex-grow ">
          {posts.map((post) => {
            return <CardPost key={post._id.toString()} post={post} />;
          })}
        </ul>
      </section>
      {/* </div> */}
    </main>
  );
}

export default PublicBoard;
