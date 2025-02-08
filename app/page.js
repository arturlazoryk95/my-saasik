import ButtonLogin from "@/components/ButtonLogin";

export default function Home() {
  const name = "Archik";
  const isLoggedIn = true;

  return (
    <main>
      {/* HEADER  */}
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

      {/* HERO SECTION */}
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

      {/* PRICING */}
      <section className="bg-base-200">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            Pricing
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            A pricing that adapts to your needs
          </h2>
          <div className="bg-base-100 p-8 m-10 mx-auto max-w-96 rounded-3xl">
            <div className="flex gap-2 items-baseline">
              <div className="font-black text-4xl">$100</div>
              <div className="font-medium uppercase opacity-60">/month</div>
            </div>
            <ul>
              <li>24/7 support</li>
              <li>Admin dashboard</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
