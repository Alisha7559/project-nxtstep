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
  },
  {
    question: "What if I need help during my course?",
    answer:
      "You’ll get access to mentors, community forums, and AI-powered assistance."
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes, we offer a refund within the first 7 days if you’re not satisfied."
  },
  {
    question: "Do you offer financial aid or scholarships?",
    answer:
      "Yes, selected courses offer financial aid and scholarship options."
  },
  {
    question: "How long do I have access to the course?",
    answer:
      "You’ll have lifetime access to the course content once enrolled."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-wrapper">
      {/* ================= FAQ SECTION ================= */}
      <div className="faq-container">
        {/* LEFT CARD */}
        <div className="faq-info">
          <h2>Have other questions?</h2>
          <p>We’re here to help!</p>
          <button className="ai-btn">💬 Ask Our AI</button>
        </div>

        {/* RIGHT FAQ LIST */}
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <span>{faq.question}</span>
                <span className="icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>
              <div className="faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CTA SECTION ================= */}
      <div className="learning-cta">
        <h2>Ready to Start Your Learning Journey?</h2>
        <p>
          Join thousands of learners who are already building the skills they
          need for the jobs they want.
        </p>

        <div className="cta-actions">
          <button className="cta-primary">Get Started Free</button>
          <button className="cta-secondary">Browse Courses</button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
