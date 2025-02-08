import ButtonLogin from "@/components/ButtonLogin";

export default function Home() {
  const name = "Archik";
  const isLoggedIn = true;

  return (
    <main>
      <section className="bg-base-200">
        <div className="max-w-3xl flex mx-auto justify-between items-center px-8 py-2">
          <div className="font-bold">my-saasik</div>
          <div className="space-x-4 max-md:hidden">
            <a className="link link-hover">Pricing</a>
            <a className="link link-hover">FAQ</a>
          </div>
          <div>
            <ButtonLogin />
          </div>
        </div>
      </section>
      <section className="px-8 text-center py-32 max-w-3xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">
          Collect customer feedback to build better products 🚀
        </h1>
        <div className="mb-10 opacity-80">
          Create a feedback boards in minutes, not days. Prioritize features and
          develop products in a way your customers truly desire.
        </div>
        <ButtonLogin hasLoggedIn={isLoggedIn} name={name} />
      </section>
    </main>
  );
}
