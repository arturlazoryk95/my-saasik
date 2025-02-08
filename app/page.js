import ButtonLogin from "@/components/ButtonLogin";

export default function Home() {
  const name = "Archik";
  const isLoggedIn = true;

  return (
    <main>
      <h1>Collect customer feedback please!</h1>
      <div>
        Create feedback boards in minutes, not days, not hours! Priritize love,
        not hate.
      </div>
      <ButtonLogin hasLoggedIn={isLoggedIn} name={name}>
        <div>ELO YESTEM TU</div>
      </ButtonLogin>
      <p>Hey people, it's {name} 🖐️ here!</p>
    </main>
  );
}
