import React from "react";
import "./footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="footer-newsletter">
        <div>
          <h3>Stay Updated</h3>
          <p>Subscribe to get the latest courses and career tips</p>
        </div>

        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="footer-content">
        {/* Brand */}
        <div className="footer-col">
          <h2 className="logo">Edu<span>Path</span></h2>
          <p>
            Empowering learners worldwide with quality education and career
            guidance.
          </p>

          <div className="socials">
            <a href="/" aria-label="Facebook"><FaFacebookF /></a>
            <a href="/" aria-label="Twitter"><FaTwitter /></a>
            <a href="/" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="/" aria-label="Instagram"><FaInstagram /></a>
            <a href="/" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        {/* Explore */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="/">Courses</a></li>
            <li><a href="/">Institutions</a></li>
            <li><a href="/">Online Degrees</a></li>
            <li><a href="/">Career Roles</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="/">AI Guide</a></li>
            <li><a href="/">Blog</a></li>
            <li><a href="/">Help Center</a></li>
            <li><a href="/">Community</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <p>hello@edupath.com</p>
          <p>+1 (555) 123-4567</p>
          <p>San Francisco, CA</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2024 EduPath. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
