
import { motion } from "framer-motion";
import "./style.css";

export default function ExactSecondVideoCard({
  image,
  title,
  subtitle,
  features
}) {
  return (
    <motion.div
      className="sv-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* INNER CONTENT */}
      <div className="sv-inner">
        <h4>Course Included</h4>
        <ul>
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        <span className="cta glass">View More </span>
      </div>

      {/* IMAGE COVER */}
      <motion.div
        className="sv-top"
        variants={{
          rest: { y: 0 },
          hover: { y: "-100%" }
        }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      >
        <motion.img
          src={image}
          alt={title}
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.15 }
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      {/* TITLE COVER */}
      <motion.div
        className="sv-bottom"
        variants={{
          rest: { y: 0 },
          hover: { y: "100%" }
        }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      >
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </motion.div>
    </motion.div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  },
  hover: {
    rotateX: 6,
    rotateY: -6,
    scale: 1.04
  }
};
