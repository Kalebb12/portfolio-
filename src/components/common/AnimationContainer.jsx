import { motion } from "motion/react";
import { Children } from "react";


const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      // delay: 0.5,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const AnimationContainer = ({ children, className = "" , id }) => {
  const childArray = Children.toArray(children);
  // Clone each child and apply itemVariants
  const animatedChildren = Array.isArray(childArray) ? (
    childArray.map((child, index) => (
      <motion.div key={index} custom={index} variants={itemVariants} id="ch">
        {child}
      </motion.div>
    ))
  ) : (
    <motion.div variants={itemVariants}>{children}</motion.div>
  );

  return (
    <motion.div
      className={className}
      id={id}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {animatedChildren}
    </motion.div>
  );
};
