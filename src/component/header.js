
import banner from "./banner.jpg";
import { motion } from "framer-motion";

function Head() {
  return (
    <section className="hero">
      <img src={banner} alt="Education banner" className="hero-bg" />
      <div className="hero-overlay" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Courses</h1>
        <p>Learn Anytime. Learn Anywhere.</p>
      </motion.div>


      
    </section>
  );
}

export default Head;
