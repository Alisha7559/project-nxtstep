import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./component/navbar";
import Banner from "./component/banner";
import CourseCard from "./component/coursecard";
import AIBanner from "./component/AIBanner";

import Footer from "./component/footer";
import CourseDetail from "./component/coursedetails";

import Login from "./component/login";
import Signup from "./component/signup";
import Chatbot from "./component/chatbot";
import ExploreCareers from "./component/ExploreCareers";
import FAQ from "./component/faq";
import Review from "./component/review";
import About from "./component/about";
import EnquiryForm from "./component/EnquiryForm";

import CoursesPage from "./component/coursespage";
import Degrees from "./component/degrees";


// ---------------- HOME PAGE ----------------
const Home = () => {
  return (
    <>
      <Banner />
      <About />
      <CourseCard />
      <AIBanner />

      {/* Degree preview (3 cards) */}
      <Degrees limit={3} showViewAll={true} />

      <ExploreCareers />
      <Review />
      <FAQ />
    </>
  );
};


// ---------------- DEGREE PAGE ----------------
const DegreePage = () => {
  return (
    <>
      <h2 style={{ textAlign: "center", margin: "40px 0" }}>
        All Degree Programs
      </h2>

      {/* Show all degrees */}
      <Degrees />
    </>
  );
};


// ---------------- OTHER PAGES ----------------
const Institutions = () => <h2 className="page">Institutions Page</h2>;
const Roles = () => <h2 className="page">Explore Roles Page</h2>;


// ---------------- APP ----------------
function App() {
  return (
    <Router>

      <Navbar />

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* ALL COURSES */}
        <Route path="/courses" element={<CoursesPage />} />

        {/* DEGREE PAGE */}
        <Route path="/degrees" element={<DegreePage />} />

        {/* OTHER ROUTES */}
        <Route path="/institutions" element={<Institutions />} />
        <Route path="/roles" element={<Roles />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* CHATBOT */}
        <Route path="/chatbot" element={<Chatbot />} />

        {/* COURSE DETAIL */}
        <Route path="/course/:id" element={<CourseDetail />} />

        {/* ENQUIRY */}
        <Route path="/enquiry/:id" element={<EnquiryForm />} />

      </Routes>

      <Footer />

    </Router>
  );
}

export default App;