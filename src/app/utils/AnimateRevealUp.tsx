/* eslint-disable react-hooks/exhaustive-deps */
import { motion, useAnimation, useInView } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.5, duration: 1 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeIn" },
  },
};

const AnimateRevealUp = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mainControls = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    console.log(isInView);
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
};

export default AnimateRevealUp;
