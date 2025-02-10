import ButtonLogin from "@/components/ButtonLogin";
import FAQListItems from "@/components/FAQListItems";
import NormalButton from "@/components/NormalButton";
import TickSvg from "@/components/TickSvg";
import Image from "next/image";
import productDemo from "@/app/productDemo.jpeg";

export default function Home() {
  const name = "Archik";
  const isLoggedIn = true;

  const questions = [
    {
      question: "Are there any refunds?",
      answer: "Of course, within 30 days you can return.",
    },
    {
      question: "What lifetime means?",
      answer:
        "No more payments :). One off payment that will be enough for a lifetime.",
    },
    {
      question: "How does the affiliate program work?",
      answer:
        "You get a link and if someone buys through this link, you get $51.",
    },
  ];

  return (
    <main>
      {/* HEADER  */}
      <section className="bg-base-200">
        <div className="max-w-5xl flex mx-auto justify-between items-center px-8 py-2">
          <div className="font-bold">my-saasik</div>
          <div className="space-x-4 max-md:hidden">
            <a className="link link-hover" href="#pricing">
              Pricing
            </a>
            <a className="link link-hover" href="#FAQ">
              FAQ
            </a>
          </div>
          <div>
            <ButtonLogin />
          </div>
        </div>
      </section>

      {/* HERO SECTION */}
      <section className="px-8 text-center lg:text-left py-32 max-w-5xl mx-auto flex flex-col lg:flex-row gap-14 items-center lg:items-start">
        <Image
          src={productDemo}
          alt="Product demo"
          className="w-96 rounded-xl"
        />

        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">
            Collect customer feedback to build better products 🚀
          </h1>
          <div className="mb-10 opacity-80">
            Create a feedback boards in minutes, not days. Prioritize features
            and develop products in a way your customers truly desire.
          </div>
          <ButtonLogin hasLoggedIn={isLoggedIn} name={name} />
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-base-200" id="pricing">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            Pricing
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            A pricing that adapts to your needs
          </h2>
          <div className="flex gap-4">
            <div className="bg-base-100 p-8 m-10 mx-auto max-w-96 rounded-3xl">
              <div className="flex gap-2 items-baseline mb-4">
                <div className="font-black text-4xl">$100</div>
                <div className="font-medium uppercase opacity-60">/month</div>
              </div>
              <ul>
                <li className="flex gap-2 items-center">
                  <TickSvg />
                  24/7 support
                </li>
                <li className="flex gap-2 items-center">
                  <TickSvg />
                  Admin Dashboard
                </li>
                <li className="flex gap-2 items-center">
                  <TickSvg />
                  Premium features
                </li>
                <li className="flex gap-2 items-center">
                  <TickSvg />
                  Lifetime updates
                </li>
                <li className="mt-4">
                  <NormalButton>Explore more</NormalButton>
                </li>
              </ul>
            </div>
            <div className="bg-base-100 p-8 m-10 mx-auto max-w-96 rounded-3xl">
              <div className="flex gap-2 items-baseline mb-4">
                <div className="font-black text-4xl">$800</div>
                <div className="font-medium uppercase opacity-60">/month</div>
              </div>
              <ul>
                <li className="flex gap-2 items-center">
                  <TickSvg />
                  24/7 support
                </li>
                <li className="flex gap-2 items-center">
                  <TickSvg />
                  Admin Dashboard
                </li>
                <li className="flex gap-2 items-center">
                  <TickSvg />
                  Premium features
                </li>
                <li className="flex gap-2 items-center">
                  <TickSvg />
                  Lifetime updates
                </li>
                <li className="mt-4">
                  <NormalButton extraStyle={"w-full"}>
                    Explore more
                  </NormalButton>
                </li>
              </ul>
            </div>
            <div className="bg-base-100 p-8 m-10 mx-auto max-w-96 rounded-3xl">
              <div className="flex gap-2 items-baseline mb-4">
                <div className="font-black text-4xl">$1,000</div>
                <div className="font-medium uppercase opacity-60">/month</div>
              </div>
              <ul>
                <li className="flex gap-2 items-center">
                  <TickSvg />
                  24/7 support
                </li>
                <li className="flex gap-2 items-center">
                  <TickSvg />
                  Admin Dashboard
                </li>
                <li className="flex gap-2 items-center">
                  <TickSvg />
                  Premium features
                </li>
                <li className="flex gap-2 items-center">
                  <TickSvg />
                  Lifetime updates
                </li>
                <li className="mt-4">
                  <NormalButton>Explore more</NormalButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-base-200" id="FAQ">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            FAQ
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <ul className="max-w-lg mx-auto">
            {questions.map((qa) => (
              <FAQListItems key={qa.question} qa={qa} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
