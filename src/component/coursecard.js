import { useEffect, useState } from "react";
import {
  FaStar,
  FaClock,
  FaUsers,
  FaArrowTrendUp
} from "react-icons/fa6";
import "./coursecard.css";

export default function CourseCard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/data/courses.json")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error loading courses:", err));
  }, []);

  return (
    <section className="courses-section">
      {/* HEADER */}
      <div className="courses-header">
        <div>
          <h2>Trending Courses</h2>
          <p>Most popular courses this month</p>
        </div>
        <button className="view-all">View All →</button>
      </div>

      {/* GRID */}
      <div className="courses-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            {/* IMAGE */}
            <div className="course-image">
              <img src={course.image} alt={course.title} />

              {/* BADGES */}
              <span className="badge level">{course.level}</span>

              {course.trending && (
                <span className="badge trending">
                  <FaArrowTrendUp /> Trending
                </span>
              )}
            </div>

            {/* CONTENT */}
            <div className="course-content">
              <div className="category">
                <span>{course.category}</span>
                <span className="rating">
                  <FaStar /> {course.rating}
                </span>
              </div>

              <h3>{course.title}</h3>

              <p className="desc">{course.description}</p>

              <div className="meta">
                <span>
                  <FaClock /> {course.duration}
                </span>
                <span>
                  <FaUsers /> {course.enrolled}
                </span>
              </div>

              <div className="course-footer">
                <strong>{course.price}</strong>
                <button>View More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
