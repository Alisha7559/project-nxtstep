// import { useState } from "react";
// import "./faq.css";

// const faqs = [
//   {
//     question: "How do I enroll in a course?",
//     answer:
//       "You can enroll by selecting a course and clicking the Enroll button. Follow the checkout process to get instant access."
//   },
//   {
//     question: "Are the certificates recognized by employers?",
//     answer:
//       "Yes, our certificates are recognized by many employers and showcase your verified skills."
//   },
//   {
//     question: "Can I learn at my own pace?",
//     answer:
//       "Absolutely. All courses are self-paced so you can learn anytime, anywhere."
//   }
// ];

// const FAQ = () => {

//   const [activeIndex, setActiveIndex] = useState(null);

//   const [openModal, setOpenModal] = useState(false);

//   const [formData, setFormData] = useState({
//     instituteName: "",
//     contactPerson: "",
//     email: "",
//     phone: "",
//     website: "",
//     message: ""
//   });

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {

//     const res = await fetch("http://localhost:7000/api/institution-request", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(formData)
//     });

//     const data = await res.json();

//     if (data.success) {
//       alert("Request sent successfully!");
//       setOpenModal(false);
//     } else {
//       alert("Failed to send request");
//     }

//   } catch (error) {
//     console.error(error);
//     alert("Server error");
//   }
// };
// const [openLearnMore, setOpenLearnMore] = useState(false);

//   return (
//     <>
//       <div className="faq-wrapper">

//         {/* FAQ SECTION */}

//         <div className="faq-container">

//           <div className="faq-info">
//             <h2>Have other questions?</h2>
//             <p>We’re here to help!</p>
//             <button className="ai-btn">💬 Ask Our AI</button>
//           </div>

//           <div className="faq-list">
//             {faqs.map((faq, index) => (
//               <div
//                 key={index}
//                 className={`faq-item ${activeIndex === index ? "active" : ""}`}
//                 onClick={() => toggleFAQ(index)}
//               >

//                 <div className="faq-question">
//                   <span>{faq.question}</span>
//                   <span className="icon">
//                     {activeIndex === index ? "−" : "+"}
//                   </span>
//                 </div>

//                 <div className="faq-answer">{faq.answer}</div>

//               </div>
//             ))}
//           </div>

//         </div>

//         {/* CTA SECTION */}

//         <div className="learning-cta">

//           <div className="cta-content">

//             <h2>Are You an Institution?</h2>

//             <p>
//               Partner with us and showcase your courses to thousands of learners
//               worldwide. Join our platform and grow your institute.
//             </p>

//           </div>

//           <div className="cta-actions">

//             <button
//               className="cta-primary"
//               onClick={() => setOpenModal(true)}
//             >
//               Join as Institution
//             </button>

//             <button className="cta-secondary">
//               Learn More
//             </button>
            
//           </div>

//         </div>

//       </div>

//       {/* MODAL FORM */}

//       {openModal && (

//         <div className="modal-overlay">

//           <div className="modal-box">

//             <h2>Institution Partnership Request</h2>

//             <form onSubmit={handleSubmit}>

//               <input
//                 type="text"
//                 name="instituteName"
//                 placeholder="Institution Name"
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 type="text"
//                 name="contactPerson"
//                 placeholder="Contact Person"
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone Number"
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 type="text"
//                 name="website"
//                 placeholder="Website"
//                 onChange={handleChange}
//               />

//               <textarea
//                 name="message"
//                 placeholder="Tell us about your institution"
//                 onChange={handleChange}
//               />

//               <div className="modal-buttons">

//                 <button type="submit" className="submit-btn">
//                   Send Request
//                 </button>

//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setOpenModal(false)}
//                 >
//                   Cancel
//                 </button>

//               </div>

//             </form>

//           </div>

//         </div>

//       )}
//       {openLearnMore && (
//   <div className="modal-overlay">
//     <div className="modal-box glass">
//       <h2>Why Partner With Us?</h2>
//       <p>
//         By joining our platform, your institution gains access to a global
//         learner base, promotional support, and analytics tools to track
//         student engagement. Together, we can help learners achieve their
//         educational goals.
//       </p>
//       <div className="modal-buttons">
//         <button
//           type="button"
//           className="cancel-btn"
//           onClick={() => setOpenLearnMore(false)}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </>
//   );
// };

// export default FAQ;
import { useState } from "react";
import "./faq.css";

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer:
      "You can enroll by selecting a course and clicking the Enroll button. Follow the checkout process to get instant access."
  },
  {
    question: "Are the certificates recognized by employers?",
    answer:
      "Yes, our certificates are recognized by many employers and showcase your verified skills."
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Absolutely. All courses are self-paced so you can learn anytime, anywhere."
  }
];

// Reusable Modal Component
const Modal = ({ open, onClose, title, children, glass }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className={`modal-box ${glass ? "glass" : ""}`}>
       
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [openInstitutionModal, setOpenInstitutionModal] = useState(false);
  const [openLearnMore, setOpenLearnMore] = useState(false);
  const [formData, setFormData] = useState({
    instituteName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    message: ""
  });

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:7000/api/institution-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        alert("Request sent successfully!");
        setOpenInstitutionModal(false);
        setFormData({
          instituteName: "",
          contactPerson: "",
          email: "",
          phone: "",
          website: "",
          message: ""
        });
      } else {
        alert("Failed to send request");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <>
      <div className="faq-wrapper">
        {/* FAQ SECTION */}
        <div className="faq-container">
          <div className="faq-info">
            <h2>Have other questions?</h2>
            <p>We’re here to help!</p>
            <button className="ai-btn">💬 Ask Our AI</button>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <span>{faq.question}</span>
                  <span className="icon">{activeIndex === index ? "−" : "+"}</span>
                </div>
                <div className="faq-answer">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="learning-cta">
          <div className="cta-content">
            <h2>Are You an Institution?</h2>
            <p>
              Partner with us and showcase your courses to thousands of learners
              worldwide. Join our platform and grow your institute.
            </p>
          </div>
          <div className="cta-actions">
            <button
              className="cta-primary"
              onClick={() => setOpenInstitutionModal(true)}
            >
              Join as Institution
            </button>
            <button
              className="cta-secondary"
              onClick={() => setOpenLearnMore(true)}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Institution Partnership Modal */}
      <Modal
        open={openInstitutionModal}
        onClose={() => setOpenInstitutionModal(false)}
        title="Institution Partnership Request"
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="instituteName"
            placeholder="Institution Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contactPerson"
            placeholder="Contact Person"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Tell us about your institution"
            onChange={handleChange}
          />
          <div className="modal-buttons">
            <button type="submit" className="submit-btn">
              Send Request
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setOpenInstitutionModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Learn More Modal with Glass Effect */}
      <Modal
        open={openLearnMore}
        onClose={() => setOpenLearnMore(false)}
        title="Why Partner With Us?"
        glass
      >
        <p>
          By joining our platform, your institution gains access to a global
          learner base, promotional support, and analytics tools to track
          student engagement. Together, we can help learners achieve their
          educational goals.
        </p>
        <div className="modal-buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setOpenLearnMore(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default FAQ;