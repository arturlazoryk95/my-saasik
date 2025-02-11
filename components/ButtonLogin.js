"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session }) => {
  // console.log(props);
  // console.log(hasLoggedIn);
  // console.log(name);
  const call_back_url = "/dashboard";
  if (session) {
    return (
      <Link href={call_back_url} className="btn btn-primary">
        Go to Dashboard :) {session.user.name || "friend"}
      </Link>
    );
  } else {
    return (
      <button
        onClick={() => {
          signIn(undefined, { callbackUrl: call_back_url });
        }}
        className="btn btn-primary"
      >
        Get started!
      </button>
    );
  }
};

export default ButtonLogin;
