import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./component/navbar";
import Banner from "./component/banner";
import CourseCard from "./component/coursecard";
import AIBanner from "./component/AIBanner";
import Degrees from "./component/degree";
import Footer from "./component/footer";
import CourseDetail from "./component/coursedetails";

import Login from "./component/login";
import Signup from "./component/signup";
import Chatbot from "./component/chatbot";
import ExploreCareers from "./component/ExploreCareers";
import FAQ from "./component/faq";
import Review from "./component/review";
import About from "./component/about";

import CoursesPage from "./component/coursespage";   // ✅ MOVE HERE


const Home = () => (
  <>
    <Banner />
    <About />
    <CourseCard />
    <AIBanner />
    <Degrees />
    <ExploreCareers />
    <Review />
    <FAQ />
  </>
);

const Institutions = () => <h2 className="page">Institutions Page</h2>;
const OnlineDegrees = () => <h2 className="page">Online Degrees Page</h2>;
const Roles = () => <h2 className="page">Explore Roles Page</h2>;

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/institutions" element={<Institutions />} />
        <Route path="/degrees" element={<OnlineDegrees />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/course/:id" element={<CourseDetail />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;