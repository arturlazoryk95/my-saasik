"use client";

import { motion } from "motion/react";
import icon from "@/app/public/icon.png";
import Image from "next/image";

const SexyButton = () => {
  return (
    <div className="font-extrabold text-xl flex gap-1 items-center">
      <motion.button
        animate={{ rotate: 180, duration: 2.0 }}
        whileTap={{ scale: 0.9, rotate: 360 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <Image src={icon} className="size-8" />
      </motion.button>
      <div>CodeSea</div>
      {/* <div>o</div>
      <div>d</div>
      <div>e</div>
      <div>S</div>
      <div>e</div>
      <div>a</div> */}
    </div>
  );
};

export default SexyButton;
