import React, { useEffect, useState } from "react";
import "./review.css";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // 🔥 make sure token is stored here

    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    fetch("http://localhost:7000/api/feedback/feedback", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`   // ✅ VERY IMPORTANT
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setReviews(data.data || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
        setError("Unable to load reviews");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="review-section">
      <h2>Helping Learners Succeed Worldwide</h2>

      <div className="review-slider">
        <div className="review-track">
          {[...reviews, ...reviews].map((review, index) => (
            <div className="review-card" key={index}>
              <p className="review-text">
                “{review.message || "No message"}”
              </p>
              <h4>{review.studentid?.studentname || "Anonymous"}</h4>
              <span>{review.courseid?.coursename || "Student"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;