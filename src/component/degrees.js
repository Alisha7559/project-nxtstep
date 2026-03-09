import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaUsers, FaStar } from "react-icons/fa";
import "./degree.css";

const Degrees = ({ limit = null, showViewAll = false }) => {

  const navigate = useNavigate();

  const [degrees, setDegrees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("http://localhost:7000/api/institute/allcourse", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {

        const degreeCourses = (data?.data || []).filter(course =>
          course.subcategory?.name?.toLowerCase() === "degree"
        );

        const finalCourses = limit
          ? degreeCourses.slice(0, limit)
          : degreeCourses;

        setDegrees(finalCourses);
        setLoading(false);

      });

  }, [limit]);

  return (

    <section className="degrees-section">

      {/* HEADER */}
      <div className="degrees-header">

        <div className="degrees-header-left">
          <span className="badge">Online Degrees</span>
          <h2>Degrees from Top Universities</h2>
          <p>Earn accredited degrees 100% online</p>
        </div>

        {showViewAll && (
          <button
            className="view-all"
            onClick={() => navigate("/degrees")}
          >
            View All →
          </button>
        )}

      </div>

      {loading && <p>Loading degrees...</p>}

      <div className="degrees-grid">

        {degrees.map((course) => (

          <div className="degree-card" key={course._id}>

            {/* IMAGE */}
            <div className="degree-img-wrapper">

              <img
                src={
                  course.images?.length
                    ? `http://localhost:7000/${course.images[0]}`
                    : "/placeholder.png"
                }
                alt={course.courseName}
              />

              <span className="degree-tag">
                {course.category?.name}
              </span>

            </div>

            {/* BODY */}
            <div className="degree-body">

              <div className="degree-top">

                <span className="degree-category">
                  {course.category?.name}
                </span>

                <span className="degree-rating">
                  <FaStar color="#ff6b00" /> 4.5
                </span>

              </div>

              <h3 className="degree-title">
                {course.courseName}
              </h3>

              <p className="degree-desc">
                {course.description?.slice(0, 120)}...
              </p>

              <div className="degree-meta">

                <span>
                  <FaClock /> {course.mode}
                </span>

                <span>
                  <FaUsers /> {course.totalSeats} Seats
                </span>

              </div>

              <div className="degree-footer">

                <span className="degree-price">
                  ₹ {course.fees}
                </span>

                <button
                  className="view-btn"
                  onClick={() => navigate(`/course/${course._id}`)}
                >
                  View More
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>

  );
};

export default Degrees;