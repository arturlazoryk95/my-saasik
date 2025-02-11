"use client";

import { signOut } from "next-auth/react";

const ButtonLogout = () => {
  return (
    <button
      onClick={() => {
        signOut();
      }}
      className="btn btn-ghost"
    >
      Log out
    </button>
  );
};

export default ButtonLogout;
