// 19:14

import ButtonFill from "@/components/ButtonFill";
import FormFakturka from "@/components/FormFakturka";

export default function Home() {
  return (
    <main>
      {/* HEADER */}
      <section>
        <h1 className="font-extrabold text-center bg-base-200 text-5xl py-10 font-mono">
          DEJ MNIE FAKTURKE 🤑
        </h1>
      </section>
      {/* INVOICE SECTION */}
      <section className="mx-auto max-w-3xl px-5 py-12 space-y-5">
        <h1 className="font-extrabold mb-6 mt-5 text-3xl">
          Wpisz dane faktury
        </h1>
        <div className="flex gap-3">
          <FormFakturka />
        </div>
      </section>

      {/* FOOTER SECTION */}
    </main>
  );
}
