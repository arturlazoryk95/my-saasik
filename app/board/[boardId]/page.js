import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";
import { redirect } from "next/navigation";

// 14:15

const getPublicBoard = async (boardId) => {
  await connectMongo();

  const board = await Board.findById(boardId);
  if (!board) {
    redirect("/");
  }

  return board;
};

async function PublicBoard(props) {
  const board = await getPublicBoard(props.params.boardId);

  return <div>{board.name} (public)</div>;
}

export default PublicBoard;
