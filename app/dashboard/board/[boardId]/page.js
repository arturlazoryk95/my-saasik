import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";
import User from "@/models/User";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const getBoard = async (boardId) => {
  const session = await auth();
  await connectMongo();
  try {
    const board = await Board.findOne({
      _id: boardId,
      userId: session?.user?.id,
    });
    return board;
  } catch (e) {
    toast.error(e.message);
    redirect("/dashboard");
  }
};

async function FeedbackBoard(props) {
  const board = await getBoard(props.params.boardId);
  return <div>{board.name}</div>;
}

export default FeedbackBoard;
