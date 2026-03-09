import React, { useEffect, useState } from "react";
import "./review.css";
import { Rating } from "@mui/material";

const Review = () => {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    fetch("http://localhost:7000/api/feedback/public-feedback")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch reviews");
        }
        return res.json();
      })
      .then((data) => {
        setReviews(data.data || []);
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

              {/* Name */}
              <h4 className="review-name">
                {review.studentid?.studentname || "Anonymous"}
              </h4>

              {/* Email */}
              <p className="review-email">
                {review.studentid?.email || "No email"}
              </p>

              {/* Rating */}
              <Rating
                value={review.rating || 0}
                precision={0.5}
                readOnly
                size="small"
              />

              {/* Description */}
              <p className="review-text">
                “{review.message || "No feedback message"}”
              </p>

              {/* Course */}
              <span className="review-course">
                {review.courseid?.courseName || ""}
              </span>

            </div>

          ))}

        </div>
      </div>

    </div>
  );
};

export default Review;