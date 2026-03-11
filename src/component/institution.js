import React, { useEffect, useState } from "react";
import axios from "axios";
import "../component/institution.css";

const Institutions = () => {

  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchInstitutions = async () => {

      try {

        const res = await axios.get("http://localhost:7000/api/allinsti");

        setInstitutions(res.data);

      } catch (error) {

        console.log("Error fetching institutions:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchInstitutions();

  }, []);

  if (loading) {
    return (
      <div className="institutions-page">
        <h2>Loading Institutions...</h2>
      </div>
    );
  }

  return (

    <div className="institutions-page">

      {/* HEADER */}

      <div className="inst-header-section">

        <h1>Educational Institutions</h1>

        <p>
          Discover top institutions offering world-class education and career opportunities
        </p>

      </div>


      {/* LIST */}

      <div className="institution-list">

        {institutions.length > 0 ? (

          institutions.map((inst) => (

            <div className="institution-card" key={inst._id}>

              {/* IMAGE */}

              <div className="inst-image">

                <img
                  src={
                    inst.profileImage
                      ? `http://localhost:7000/uploads/${inst.profileImage}`
                      : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
                  }
                  alt={inst.name}
                />

              </div>


              {/* CONTENT */}

              <div className="inst-content">

                <div className="inst-top">

                  <div>

                    <h2>{inst.institutionName || inst.name}</h2>

                    <p className="location">
                      {inst.city || "-"}, {inst.state || "-"}
                    </p>

                  </div>

                  <span className={inst.isActive ? "status active" : "status inactive"}>
                    {inst.isActive ? "Certified" : "Inactive"}
                  </span>

                </div>


                {/* DESCRIPTION */}

                <p className="description">
                  {inst.description || "No description available"}
                </p>


                {/* STATS */}

                <div className="inst-stats">

                  <div className="stat-box">
                    <span className="stat-title">Established</span>
                    <span className="stat-value">{inst.yearEstablished || "-"}</span>
                  </div>

                  <div className="stat-box">
                    <span className="stat-title">Registration</span>
                    <span className="stat-value">{inst.registrationNumber || "-"}</span>
                  </div>

                  <div className="stat-box">
                    <span className="stat-title">Accreditation</span>
                    <span className="stat-value">{inst.accreditationAuthority || "-"}</span>
                  </div>

                </div>


                {/* CONTACT */}

                <div className="inst-contact">

                  <p><strong>Email:</strong> {inst.officialEmail || inst.email}</p>

                  <p><strong>Website:</strong> {inst.website || "-"}</p>

                  <p>
                    <strong>Address:</strong> {inst.address || "-"}, {inst.city || "-"}
                  </p>

                </div>

              </div>

            </div>

          ))

        ) : (

          <p>No Institutions Found</p>

        )}

      </div>

    </div>

  );

};

export default Institutions;