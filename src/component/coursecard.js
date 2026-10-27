import { useEffect, useState } from "react";
import { FaStar, FaClock, FaUsers } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./coursecard.css";

export default function CourseCard() {

  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // ✅ correct place

  useEffect(() => {
    fetch("http://localhost:7000/api/institute/allcourse", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data) && data.data.length > 0) {
          setCourses(data.data);
        } else {
          // Fallback to local courses.json if backend has no courses yet
          fetch("/data/courses.json")
            .then((r) => r.json())
            .then((local) => {
              const formatted = (local || []).map((c) => ({
                _id: c.id,
                courseName: c.title,
                description: c.description,
                category: { name: c.category },
                rating: c.rating,
                level: c.level,
                mode: "Online",
                totalSeats: 100,
                fees: c.price ? c.price.replace(/[^0-9]/g, "") : "2999",
                images: [c.image],
              }));
              setCourses(formatted);
            })
            .catch(() => setCourses([]));
        }
      })
      .catch((err) => {
        console.error("API error, falling back to local courses:", err);
        fetch("/data/courses.json")
          .then((r) => r.json())
          .then((local) => {
            const formatted = (local || []).map((c) => ({
              _id: c.id,
              courseName: c.title,
              description: c.description,
              category: { name: c.category },
              rating: c.rating,
              level: c.level,
              mode: "Online",
              totalSeats: 100,
              fees: c.price ? c.price.replace(/[^0-9]/g, "") : "2999",
              images: [c.image],
            }));
            setCourses(formatted);
          })
          .catch(() => setCourses([]));
      });
  }, []);

  const fallbackImg = "/placeholder.png";

  return (
    <section className="courses-section">
      <div className="courses-header">
        <div>
          <h2>Trending Courses</h2>
          <p>Most popular courses this month</p>
        </div>
        <button
          className="view-all"
          onClick={() => navigate(`/courses`)}
        >
          View All
        </button>
      </div>

      <div className="courses-grid">
        {(courses || []).slice(0, 3).map((course) => {
          const rawImg = course.images && course.images.length > 0 ? course.images[0] : "";
          const imgSrc = rawImg
            ? rawImg.startsWith("http") || rawImg.startsWith("/")
              ? rawImg
              : `http://localhost:7000/${rawImg}`
            : fallbackImg;

          return (

            <div className="course-card" key={course._id}>

              <div className="course-image">

                <img
                  src={imgSrc}
                  alt={course.courseName || course.title || "Course"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/course-web.jpg";
                  }}
                />

                <span className="badge level">
                  {course.level || "N/A"}
                </span>

              </div>

              <div className="course-content">

                <div className="category">

                  <span>
                    {course.category?.name || "General"}
                  </span>

                  <span className="rating">
                    <FaStar /> {course.rating || 4.5}
                  </span>

                </div>

                <h3>{course.courseName}</h3>

                <p className="desc">
                  {course.description || "No description"}
                </p>

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

                  {/* ✅ FIXED BUTTON */}
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/course/${course._id}`)}
                  >
                    View More
                  </button>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

}
