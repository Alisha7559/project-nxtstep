
import { useEffect, useState } from "react";
// import CourseLevelFilter from "./courselevel";
import { motion } from "framer-motion";
import "./style.css";

export default function CourseCategorySection({
  courses,
  setCourses,
  allCourses
}) {
  const [search, setSearch] = useState("");

  // 🔍 Automatic search while typing
  useEffect(() => {
    if (!search.trim()) {
      setCourses(allCourses);
    } else {
      const filtered = allCourses.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setCourses(filtered);
    }
  }, [search, allCourses, setCourses]);

  return (
    <section className="course-category-section">

      {/* 🔍 SEARCH */}
      <motion.div
        className="course-search-wrapper"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="course-search-box">
          <input
            type="text"
            className="course-search-input"
            placeholder="Search courses, skills, institutions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
        </div>
      </motion.div>

      {/* 🔘 FILTER BUTTONS */}
      <motion.div
        className="category-wrapper"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <button className="category-btn glass">Degree Courses</button>
        <button className="category-btn glass">Diploma Courses</button>
        {/* <button className="category-btn glass">Institutions</button> */}

        {/* <CourseLevelFilter />  */}
      </motion.div>
    </section>
  );
}
