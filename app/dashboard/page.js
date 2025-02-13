import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Board from "@/models/Board";

async function getUser() {
  const session = await auth();
  await connectMongo();
  const user = await User.findById(session.user.id).populate("boards");
  return user;
}

export default async function Dashboard() {
  const user = await getUser();
  return (
    <main className="bg-base-200 min-h-screen">
      <section className="bg-base-100 px-5 py-3 flex justify-end">
        <ButtonLogout />
      </section>

      <section className="max-w-5xl mx-auto py-12 px-5 space-y-12">
        <FormNewBoard />
        <div>
          <h1 className="font-extrabold text-xl mb-4">
            My boards {user.boards.length}:
          </h1>
          <ul className="space-y-4">
            {user.boards.map((board) => {
              return (
                <div className="bg-base-100 rounded-3xl p-6" key={board._id}>
                  {board.name}
                </div>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
