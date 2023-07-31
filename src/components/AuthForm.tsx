"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  exit: {
    x: "-100vw",
    transition: { ease: "easeIn" },
  },
};

const AuthFormModal = () => {
  return (
    <motion.div>
      <AnimatePresence></AnimatePresence>
    </motion.div>
  );
};

export default AuthFormModal;
