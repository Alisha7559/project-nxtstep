import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./component/navbar";
import Banner from "./component/banner";
import CourseCard from "./component/coursecard";
import AIBanner from "./component/AIBanner";
import Degrees from "./component/degree";
import Footer from "./component/footer";

import Login from "./component/login";
import Signup from "./component/signup";
import Chatbot from "./component/chatbot";
import ExploreCareers from "./component/ExploreCareers";
import FAQ from "./component/faq";
import Review from "./component/review";
import About from "./component/about";

const Home = () => (
  <>
    <Banner />
    <About/>
    <CourseCard />
    <AIBanner />
    <Degrees />
    <ExploreCareers/>
    <Review/>
    <FAQ/>
  </>
);

const Courses = () => <h2 className="page">Courses Page</h2>;
const Institutions = () => <h2 className="page">Institutions Page</h2>;
const OnlineDegrees = () => <h2 className="page">Online Degrees Page</h2>;
const Roles = () => <h2 className="page">Explore Roles Page</h2>;

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/institutions" element={<Institutions />} />
        <Route path="/degrees" element={<OnlineDegrees />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
