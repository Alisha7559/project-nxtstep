import React, { useEffect, useState } from "react";
import "./degree.css";

const Degrees = () => {
  const [degrees, setDegrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data/degrees.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch degrees");
        return res.json();
      })
      .then((data) => {
        setDegrees(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load degrees");
        setLoading(false);
      });
  }, []);

  return (
    <section className="degrees-section">
      <div className="degrees-header">
        <div className="degrees-header-left">
          <span className="badge">Online Degrees</span>
          <h2>Degrees from Top Universities</h2>
          <p>Earn accredited degrees 100% online</p>
        </div>

        {/* FIX: button instead of anchor */}
        <button className="view-all">View All →</button>
      </div>

      {loading && <p>Loading degrees...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="degrees-grid">
        {degrees.map((item) => (
          <div className="degree-card" key={item.id}>
            <div className="degree-img-wrapper">
              <img src={item.image} alt={item.title} />
              <span className="degree-tag">{item.level}</span>
            </div>

            <div className="degree-body">
              <p className="degree-university">{item.university}</p>
              <h3 className="degree-title">{item.title}</h3>
              <p className="degree-desc">{item.description}</p>

              <div className="degree-meta">
                <span className="degree-duration">{item.duration}</span>
                <span className="degree-price">{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Degrees;
