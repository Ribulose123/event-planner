export const fadein = (
    direction: "up" | "down" | "left" | "right" | "none", 
    delay: number
  ) => {
    return {
      hidden: {
        opacity: 0,
        y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
        x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      },
      show: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          type: "tween",
          duration: 0.3,
          delay: delay,
          /* stiffness: 80,
          damping: 20, */
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
      exit: {
        opacity: 0,
        y: direction === "up" ? -40 : direction === "down" ? 40 : 0,
        x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
        transition: {
          duration: 0.3, // Matches the entry duration for smooth exit
        },
      },
    };
  };
  