import { useEffect, useState } from "react";
import "./banner.css";
import { BookOpen, Users, GraduationCap, Briefcase } from "lucide-react";

const slides = [
  {
    badge: "10,000+ Students Learning",
    title: "Unlock Your Potential with World-Class Learning",
    description:
      "Join millions of learners worldwide and transform your career with courses from top institutions.",
    primaryBtn: "Explore Courses",
    secondaryBtn: "How it works",
    stats: [
      { value: "50K+", label: "Students" },
      { value: "200+", label: "Courses" },
      { value: "4.9", label: "Rating" },
    ],
    image: "/images/slide1.png",
  },
  {
    badge: "AI-Powered Guidance",
    title: "Get Career-Ready with AI-Powered Guidance",
    description:
      "Our AI chatbot helps you discover the perfect learning path based on your interests and goals.",
    primaryBtn: "Try AI Guide",
    secondaryBtn: "How it works",
    stats: [
      { value: "100+", label: "Career Paths" },
      { value: "24/7", label: "Guidance" },
      { value: "95%", label: "Success Rate" },
    ],
    image: "/images/slide2.png",
  },
  {
    badge: "Top Universities",
    title: "Earn Recognized Degrees Online",
    description:
      "Study at your own pace and earn degrees from top universities without leaving your home.",
    primaryBtn: "View Degrees",
    secondaryBtn: "How it works",
    stats: [
      { value: "50+", label: "Universities" },
      { value: "75+", label: "Degrees" },
      { value: "10K+", label: "Graduates" },
    ],
    image: "/images/slide3.png",
  },
];

export default function Banner() {
  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % slides.length);
        setAnimate(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[active];

  return (
    <>
      <section className="banner">
        <div className="banner-container">
          <div className={`banner-content ${animate ? "fade-slide" : ""}`}>
            <span className="badge">{slide.badge}</span>
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>

            <div className="buttons">
              <button className="btn-primary">{slide.primaryBtn}</button>
              <button className="btn-secondary">{slide.secondaryBtn}</button>
            </div>

            <div className="stats">
              {slide.stats.map((stat, i) => (
                <div key={i} className="stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE FRAME */}
          <div className={`banner-image-frame ${animate ? "image-slide" : ""}`}>
            <img src={slide.image} alt="Banner Visual" />
          </div>
        </div>

        <div className="dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </section>

      {/* ================= STATS BAR ================= */}
      <section className="stats-bar">
        <div className="stats-bar-container">
          <div className="stats-item">
            <BookOpen className="icon courses" />
            <h3>500+</h3>
            <p>Courses</p>
          </div>

          <div className="stats-item">
            <Users className="icon students" />
            <h3>50K+</h3>
            <p>Students</p>
          </div>

          <div className="stats-item">
            <GraduationCap className="icon institutions" />
            <h3>100+</h3>
            <p>Institutions</p>
          </div>

          <div className="stats-item">
            <Briefcase className="icon placement" />
            <h3>95%</h3>
            <p>Placement Rate</p>
          </div>
        </div>
      </section>
    </>
  );
}
