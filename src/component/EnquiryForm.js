import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EnquiryForm = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [instituteId, setInstituteId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    qualification: "",
    description: ""
  });

  /* ================= FETCH COURSE ================= */

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log("Course ID:", id); // 🔍 debug

        const res = await axios.get(
          `http://localhost:7000/api/course/${id}`,   // ✅ CORRECT TEMPLATE STRING
          { withCredentials: true }                   // remove if not using auth
        );

        const courseData = res.data.data;

        setCourse(courseData);

        // ✅ Handle populated institution
        if (courseData?.institution?._id) {
          setInstituteId(courseData.institution._id);
        } else if (courseData?.institution) {
          setInstituteId(courseData.institution);
        } else {
          setInstituteId("");
        }
        console.log();
        

      } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
        setMessage(
          error.response?.data?.message || "Failed to load course"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:7000/api/enquiry`,
        {
          courseId: id,
          instituteId: instituteId,
          name: formData.name,
          phone: formData.phone,
          qualification: formData.qualification,
          description: formData.description
        },
        { withCredentials: true }  // remove if no auth
      );

      setMessage(res.data.message || "Enquiry submitted successfully");

      setFormData({
        name: "",
        phone: "",
        qualification: "",
        description: ""
      });

    } catch (error) {
      console.error("Submit error:", error.response?.data || error.message);

      setMessage(
        error.response?.data?.message || "Failed to submit enquiry"
      );
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  if (!course) {
    return <div style={{ padding: 40 }}>Course not found</div>;
  }

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "auto" }}>
      <h2>Course Enquiry</h2>
      <h3 style={{ marginBottom: 20 }}>{course.courseName}</h3>

      {message && (
        <p style={{ color: "red", marginBottom: 15 }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Message"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Submit Enquiry
        </button>
      </form>
    </div>
  );
};

/* ================= STYLES ================= */

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#020617",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default EnquiryForm;