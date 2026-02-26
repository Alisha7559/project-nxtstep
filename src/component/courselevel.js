// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import "./style.css";

// export default function CourseLevelFilter() {
//   const [open, setOpen] = useState(false);
//   const levels = ["Beginner", "Intermediate", "Advanced"];

//   return (
//     <motion.div
//       className="course-level-container"
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       viewport={{ once: true }}
//     >
//       {/* MAIN BUTTON (same as others) */}
//       <button
//         className="category-btn glass"
//         onClick={() => setOpen(!open)}
//       >
//         Course Level
//       </button>

//       {/* DROPDOWN */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             className="level-dropdown"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.25 }}
//           >
//             {levels.map((level, i) => (
//               <button key={i} className="level-option">
//                 {level}
//               </button>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }
