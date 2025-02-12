"use client";

import { motion } from "motion/react";
import Link from "next/link";

const SexyButton = () => {
  return (
    <motion.button
      className="btn btn-secondary"
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.2 }}
    >
      <Link href="https://docs.google.com/forms/u/2/d/e/1FAIpQLScQHtDMXapJAJXZMyISxnQ9PjDih3JuXc05nJWn-3uL1kjpdg/formResponse">
        gimme more coding 🤌
      </Link>
    </motion.button>
  );
};

export default SexyButton;
