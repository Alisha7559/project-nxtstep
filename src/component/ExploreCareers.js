import React, { useEffect, useState } from "react";
import "./explorecareers.css";
import { MdOutlineAutoAwesome } from "react-icons/md";

const ExploreCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data/careers.json") // Dummy JSON
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setCareers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load careers");
        setLoading(false);
      });
  }, []);

  return (
    <div className="careers-section">
      {/* Header */}
      <div className="careers-header">
        <h2>Explore Careers</h2>
        <span className="explore-all">Explore all →</span>
      </div>

      {/* Status */}
      {loading && <p className="status">Loading careers...</p>}
      {error && <p className="error">{error}</p>}

      {/* Careers Grid */}
      <div className="careers-grid">
        {careers.map((career) => (
          <div className="career-card" key={career.id}>
            <img src={career.image} alt={career.title} />

            <div className="career-content">
              <h3>{career.title}</h3>
              <p>{career.description}</p>

              <div className="career-meta">
                <span>
                  <strong>{career.salary}</strong> median salary
                </span>
                <span>{career.jobs} jobs available</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Banner */}
      <div className="career-ai-banner">
        <div className="career-ai-content">
          <span className="career-ai-badge">AI-Powered</span>

          <h2 className="career-ai-title">
            Get Personalized Career Guidance
          </h2>

          <p className="career-ai-description">
            Tell us your interests and education level, and our AI will recommend
            the best career paths and courses for you.
          </p>

          <button className="career-ai-button">
            Start Career Chat
          </button>
        </div>

        {/* STANDARD AI ICON */}
        <div className="career-ai-icon">
          <MdOutlineAutoAwesome />
        </div>
      </div>
    </div>
  );
};

export default ExploreCareers;
