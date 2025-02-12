import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";

export default function Dashboard() {
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
