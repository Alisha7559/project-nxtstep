import { useEffect, useState } from "react";
import "./style.css";

export default function CourseCategorySection({
  courses,
  setCourses,
  allCourses
}) {

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  // FETCH CATEGORIES CREATED BY ADMIN
  useEffect(() => {
    fetch("http://localhost:7000/api/category")
      .then(res => res.json())
      .then(data => {
        setCategories(data.data || []);
      });
  }, []);

  // SEARCH FILTER
  useEffect(() => {

    let filtered = [...allCourses];

    if (search.trim()) {
      filtered = filtered.filter(course =>
        course.courseName
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (activeCategory !== "all") {
      filtered = filtered.filter(
        c => c.category?.name === activeCategory
      );
    }

    setCourses(filtered);

  }, [search, activeCategory, allCourses, setCourses]);

  return (
    <section className="course-category-section">

      {/* SEARCH */}
      <div className="course-search-wrapper">

        <input
          type="text"
          placeholder="Search courses..."
          className="course-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* CATEGORY FILTERS */}
      <div className="category-wrapper">

        <button
          className={`category-btn ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All
        </button>

        {categories.map(cat => (

          <button
            key={cat._id}
            className={`category-btn ${
              activeCategory === cat.name ? "active" : ""
            }`}
            onClick={() => setActiveCategory(cat.name)}
          >
            {cat.name}
          </button>

        ))}

      </div>

    </section>
  );
}