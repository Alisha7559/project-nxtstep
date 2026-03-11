import { useEffect, useState } from "react";
import CourseCategorySection from "./coursecategory";
import Head from "./header";
import { FaStar, FaClock, FaUsers } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./coursecard.css";

export default function CoursesPage({ type }) {

  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    fetch("http://localhost:7000/api/institute/allcourse", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {

        let courseData = data.data;

        if (type === "degree") {
          courseData = courseData.filter(course =>
            course.subcategory?.name?.toLowerCase() === "degree"
          );
        }

        setCourses(courseData);
        setAllCourses(courseData);

      });

  }, [type]);

  const fallbackImg = "/placeholder.png";

  return (
    <>
      <Head />

      <CourseCategorySection
        courses={courses}
        setCourses={setCourses}
        allCourses={allCourses}
      />

      <section className="courses-section">

        <div className="courses-grid">

          {courses.map(course => {

            const imgSrc =
              course.images && course.images.length > 0
                ? `http://localhost:7000/${course.images[0]}`
                : fallbackImg;

            return (

              <div className="course-card" key={course._id}>

                <div className="course-image">
                  <img src={imgSrc} alt={course.courseName} />

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
    </>
  );
}