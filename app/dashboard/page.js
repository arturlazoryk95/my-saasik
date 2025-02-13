import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

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

      <section className="max-w-5xl mx-auto py-12 px-5">
        <FormNewBoard />
      </section>
    </main>
  );
}
