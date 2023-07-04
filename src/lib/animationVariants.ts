export const offscreenVariants = {
  left: {
    opacity: 0,
    x: "-100vw",
  },
  right: {
    opacity: 0,
    x: "100vw",
  },
  top: {
    opacity: 0,
    y: "-100vw",
  },
  down: {
    opacity: 0,
    y: "100vw",
  },
  visible: {
    opacity: 1,
    x: "0",
    y: "0",
  },
};

export const moveVariant = {
  leftBottom: {
    opacity: 0,
    x: "-100%",
    y: "1rem",
    blur: "5px",
  },
  top: {
    opacity: 0,
    y: "-100%",

    blur: "5px",
  },
  down: {
    opacity: 0,
    y: "100%",
    blur: "5px",
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  exitUp: {
    height: "-100px",
    transition: { delay: 0, duration: 1, ease: "anticipate" },
    mode: "popLayout",
  },
};
