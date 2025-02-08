import Link from "next/link";

const ButtonLogin = ({ hasLoggedIn, name }) => {
  // console.log(props);
  // console.log(hasLoggedIn);
  // console.log(name);
  if (hasLoggedIn === true) {
    return (
      <Link href="/dashboard" className="btn btn-primary">
        Go to Dashboard :) {name}
      </Link>
    );
  } else {
    return <button className="btn btn-secondary">Log in please.</button>;
  }
};

export default ButtonLogin;
