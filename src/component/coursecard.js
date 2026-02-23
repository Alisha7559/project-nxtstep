
import { useEffect, useState } from "react";
import { FaStar, FaClock, FaUsers } from "react-icons/fa6";
import "./coursecard.css";

export default function CourseCard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
  fetch("http://localhost:7000/api/institute/allcourse", {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("COURSES:", data.data);
      setCourses(data.data);
    })
    .catch((err) => console.error(err));
}, []);

  // Fallback image
  const fallbackImg = "/placeholder.png"; // Place a placeholder image in your public folder

  return (
    <section className="courses-section">
      <div className="courses-header">
        <div>
          <h2>Trending Courses</h2>
          <p>Most popular courses this month</p>
        </div>
      </div>

      <div className="courses-grid">
        {courses.map((course) => {
          // Use first image or fallback
          const imgSrc =
            course.images && course.images.length > 0
              ? `http://localhost:7000/${course.images[0]}`
              : fallbackImg;
console.log("==imgSrc", imgSrc);

          return (
            <div className="course-card" key={course._id}>
              {/* IMAGE */}
              <div className="course-image">
                <img src={imgSrc} alt={course.courseName} />
                <span className="badge level">{course.level || "N/A"}</span>
              </div>

              {/* CONTENT */}
              <div className="course-content">
                <div className="category">
                  <span>{course.category.name || "General"}</span>
                  <span className="rating">
                    <FaStar /> {course.rating || 4.5}
                  </span>
                </div>

                <h3>{course.courseName}</h3>
                <p className="desc">{course.description || "No description"}</p>

                <div className="meta">
                  <span>
                    <FaClock /> {course.mode || "Online"}
                  </span>
                  <span>
                    <FaUsers /> {course.totalSeats || 0} Seats
                  </span>
                </div>

                <div className="course-footer">
                  <strong>₹ {course.fees || 0}</strong>
                  <button>View More</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}