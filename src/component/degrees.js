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
          course.subcategory?.name?.toLowerCase() === "degree" ||
          course.category?.name?.toLowerCase() === "degree"
        );

        if (degreeCourses.length > 0) {
          const finalCourses = limit ? degreeCourses.slice(0, limit) : degreeCourses;
          setDegrees(finalCourses);
          setLoading(false);
        } else {
          // Fallback to local degrees.json
          fetch("/data/degrees.json")
            .then(r => r.json())
            .then(localData => {
              const formatted = (localData || []).map(d => ({
                _id: d.id,
                courseName: d.title,
                description: d.description,
                institution: { name: d.university },
                category: { name: "Degree" },
                Level: d.level,
                duration: d.duration,
                fees: d.price ? d.price.replace(/[^0-9]/g, "") : "15000",
                images: [d.image]
              }));
              setDegrees(limit ? formatted.slice(0, limit) : formatted);
              setLoading(false);
            })
            .catch(() => setLoading(false));
        }
      })
      .catch((err) => {
        console.error("Degrees fetch error, falling back:", err);
        fetch("/data/degrees.json")
          .then(r => r.json())
          .then(localData => {
            const formatted = (localData || []).map(d => ({
              _id: d.id,
              courseName: d.title,
              description: d.description,
              institution: { name: d.university },
              category: { name: "Degree" },
              Level: d.level,
              duration: d.duration,
              fees: d.price ? d.price.replace(/[^0-9]/g, "") : "15000",
              images: [d.image]
            }));
            setDegrees(limit ? formatted.slice(0, limit) : formatted);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, [limit]);

  return (
    <section className="degrees-section">
      {/* HEADER */}
      <div className="degrees-header">
        <div className="degrees-header-left">
          <span className="badge">Degrees</span>
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
        {degrees.map((course) => {
          const rawImg = course.images?.length ? course.images[0] : "";
          const imgSrc = rawImg
            ? rawImg.startsWith("http") || rawImg.startsWith("/")
              ? rawImg
              : `http://localhost:7000/${rawImg}`
            : "/placeholder.png";

          return (
          <div className="degree-card" key={course._id}>
            {/* IMAGE */}
            <div className="degree-img-wrapper">
              <img
                src={imgSrc}
                alt={course.courseName}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/degree1.png";
                }}
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
          );
        })}

      </div>

    </section>

  );
};

export default Degrees;