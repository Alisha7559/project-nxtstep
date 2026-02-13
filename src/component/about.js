import React from "react";
import "./About.css";
import { FaBrain, FaGraduationCap, FaRocket, FaUserCheck } from "react-icons/fa";
import aboutImage from"./images/about.png";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">

        {/* LEFT CONTENT */}
        <div className="about-content">
          <h2>About EduPath</h2>
          <p className="about-subtitle">
            AI-Driven Career Guidance & Smart Course Recommendations
          </p>

          <p>
            EduPath is an intelligent career guidance and course recommendation
            platform that helps learners make informed decisions about their
            future. Our AI analyzes skills, interests, and career goals to
            deliver personalized learning paths.
          </p>

          <p>
            We empower students and professionals with data-driven insights,
            industry-relevant courses, and future-ready skill guidance — all in
            one powerful platform.
          </p>

          {/* FEATURES */}
          <div className="about-features">
            <div className="feature-card">
              <FaBrain className="feature-icon" />
              <span>AI Career Matching</span>
            </div>

            <div className="feature-card">
              <FaGraduationCap className="feature-icon" />
              <span>Smart Course Recommendations</span>
            </div>

            <div className="feature-card">
              <FaRocket className="feature-icon" />
              <span>Future-Ready Skills</span>
            </div>

            <div className="feature-card">
              <FaUserCheck className="feature-icon" />
              <span>Personalized Guidance</span>
            </div>
          </div>
        </div>

    
        <div className="about-image">
          <img src={aboutImage} alt="AI Career Guidance Platform" />
        </div>

      </div>
    </section>
  );
};

export default About;
