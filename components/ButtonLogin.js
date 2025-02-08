import Link from "next/link";

const ButtonLogin = ({ hasLoggedIn, name, children }) => {
  // console.log(props);
  console.log(hasLoggedIn);
  console.log(name);
  if (hasLoggedIn === true) {
    return (
      <Link href="/dashboard">
        Go to Dashboard :) {name}
        {children}
      </Link>
    );
  } else {
    return <button>Log in please. Yes, do it first. {name}</button>;
  }
};

export default ButtonLogin;
