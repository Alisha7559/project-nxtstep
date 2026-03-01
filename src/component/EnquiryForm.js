import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Enquiry = () => {
  const { id } = useParams();

  const [instituteId, setInstituteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    qualification: "",
    description: "",
  });

  /* ================= FETCH COURSE ================= */
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7000/api/course/${id}`,
          { withCredentials: true }
        );

        setInstituteId(res.data.institution);
      } catch {
        setMessage("Course not found");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:7000/api/enquiry",
        {
          courseId: id,
          instituteId,
          ...formData,
        },
        {
          withCredentials: true,
        }
      );

      setMessage("Enquiry submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        qualification: "",
        description: "",
      });

    } catch {
      setMessage("Something went wrong");
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "100px", fontSize: "18px" }}>
        Loading...
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "60px auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#1976d2",
        }}
      >
        Enquiry Form
      </h2>

      {message && (
        <p
          style={{
            textAlign: "center",
            marginBottom: "15px",
            color: message.includes("success") ? "green" : "red",
            fontWeight: "500",
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Name"
          required
          value={formData.name}
          onChange={(e)=>
            setFormData({...formData, name:e.target.value})
          }
          style={inputStyle}
        />

        <input
          type="tel"
          placeholder="Phone"
          required
          value={formData.phone}
          onChange={(e)=>
            setFormData({...formData, phone:e.target.value})
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Qualification"
          required
          value={formData.qualification}
          onChange={(e)=>
            setFormData({...formData, qualification:e.target.value})
          }
          style={inputStyle}
        />

        <textarea
          placeholder="Message"
          required
          value={formData.description}
          onChange={(e)=>
            setFormData({...formData, description:e.target.value})
          }
          rows="4"
          style={{ ...inputStyle, resize: "none" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#1976d2",
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "15px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "#125aa0")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#1976d2")
          }
        >
          Submit
        </button>

      </form>
    </div>
  );
};

/* Reusable input style */
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

export default Enquiry;