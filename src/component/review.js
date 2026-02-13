import React from "react";
import "./review.css";

const reviews = [
  {
    name: "Daniel Yang",
    role: "Software Developer",
    text: "The Web Development Bootcamp completely transformed my career. Within 3 months, I landed my dream job at a top tech company.",
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    text: "The UI/UX course gave me the foundation I needed. The instructors are industry experts with real-world insights.",
  },
  {
    name: "Sarah Johnson",
    role: "Data Scientist",
    text: "The Data Science course was incredibly comprehensive. Hands-on projects helped me transition into my new role.",
  },
  {
    name: "James Wilson",
    role: "Cloud Architect",
    text: "Excellent AWS course! The certification prep was thorough and I passed my exam on the first try.",
  },
  {
    name: "Michael Chen",
    role: "Marketing Director",
    text: "I was skeptical about online learning, but this platform proved me wrong. The quality is on par with top universities.",
  },
  {
    name: "Lisa Park",
    role: "Product Manager",
    text: "The flexible schedule and quality content made all the difference in my career growth.",
  },
];

const Review = () => {
  return (
    <div className="review-section">
      <h2>Helping Learners Succeed Worldwide</h2>

      <div className="review-slider">
        <div className="review-track">
          {[...reviews, ...reviews].map((review, index) => (
            <div className="review-card" key={index}>
              <p className="review-text">“{review.text}”</p>
              <h4>{review.name}</h4>
              <span>{review.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
