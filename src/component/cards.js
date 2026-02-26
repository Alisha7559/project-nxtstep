import { motion } from "framer-motion";
import ExactSecondVideoCard from "./courses";

export default function Cards({ courses = [] }) {

  return (

    <motion.div
      className="cards-grid"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.15 }
        }
      }}
    >

      {courses.map((course) => (

        <ExactSecondVideoCard

          key={course.id}

          image={course.image}

          title={course.title}

          subtitle={course.subtitle}

          features={course.features}

        />

      ))}

    </motion.div>

  );

}

  