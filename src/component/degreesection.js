// import "./degreepage.css";
// import { Link } from "react-router-dom";

// export default function DegreeSection({ courses, showViewAll }) {

//   return (
//     <div className="degree-section">

//       <h2 className="degree-title">Popular Degree Programs</h2>

//       <div className="degree-container">

//         {courses.map(course => (
//           <div key={course.id} className="degree-card">

//             <img src={course.image} alt={course.title} />

//             <div className="degree-content">

//               <h3>{course.title}</h3>
//               <p>{course.subtitle}</p>

//               <ul>
//                 {course.features.map((f, i) => (
//                   <li key={i}>{f}</li>
//                 ))}
//               </ul>

//               <button className="degree-btn">View Details</button>

//             </div>

//           </div>
//         ))}

//       </div>

//       {showViewAll && (
//         <div className="view-all-container">
//           <Link to="/degrees">
//             <button className="view-all-btn">View All Degrees</button>
//           </Link>
//         </div>
//       )}

//     </div>
//   );
// }