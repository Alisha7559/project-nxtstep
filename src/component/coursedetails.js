// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import useCourseDetail from "../hooks/useCourseDetail";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Chip,
//   Divider,
//   Paper,
//   Button,
//   CircularProgress,
//   Modal,
//   TextField,
//   MenuItem,
// } from "@mui/material";

// export default function CourseDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { course, loading, error } = useCourseDetail(id);

//   const [student, setStudent] = useState(null);
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   const [openRegisterModal, setOpenRegisterModal] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [registering, setRegistering] = useState(false);

//   // =========================
//   // CHECK IF LOGGED IN
//   // =========================
// useEffect(() => {
//   const checkLogin = async () => {
//     try {
//       const res = await fetch("http://localhost:7000/api/profile", {
//         method: "GET",
//         credentials: "include"
//       });

//       const data = await res.json();
//       setStudent(data.student);

//     } catch (error) {
//       setStudent(null);
//     } finally {
//       setCheckingAuth(false);
//     }
//   };

//   checkLogin();
// }, []);

//   // =========================
//   // AUTO OPEN MODAL AFTER LOGIN REDIRECT
//   // =========================
 
//   useEffect(() => {
//   if (checkingAuth) return; // wait until auth is checked

//   if (location.state?.openRegister && student) {
//     setOpenRegisterModal(true);
//     // Remove state after opening modal to prevent re-trigger
//     navigate(location.pathname, { replace: true });
//   }
// }, [location.state, student, navigate, checkingAuth]);

//   // =========================
//   // BUTTON HANDLERS
//   // =========================
//   const handleEnquire = () => {
//     navigate(`/enquiry/${id}`);
//   };

//  const handleRegisterClick = () => {
//   if (checkingAuth) return; // wait for auth check

//   if (!student) {
//     navigate("/login", {
//       state: { returnTo: `/course/${id}`, openRegister: true },
//     });
//     return;
//   }

//   setOpenRegisterModal(true);
// };

//   const handleSubmitRegistration = async () => {
//     if (!paymentMethod) {
//       alert("Please select payment method");
//       return;
//     }
//     if (!acceptTerms) {
//       alert("Please accept terms & conditions");
//       return;
//     }

//     try {
//       setRegistering(true);
//       const response = await fetch("http://localhost:7000/api/register-course", {
//   method: "POST",
//   credentials: "include",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     courseId: id,
//     paymentMethod
//   })
// });

// const data = await response.json();

// if (!response.ok) {
//   throw new Error(data.message);
// }

//       alert("Registered Successfully");
//       setOpenRegisterModal(false);
//       setPaymentMethod("");
//       setAcceptTerms("");
//     } catch (err) {
//   if (err.message === "Unauthorized") {
//     navigate("/login", {
//       state: {
//         returnTo: `/course/${id}`,
//         openRegister: true,
//       },
//     });
//   } else {
//     alert(err.message || "Server error");
//   }
// }finally {
//       setRegistering(false);
//     }
//   };

//   // =========================
//   // LOADING & ERROR STATES
//   // =========================
//   if (loading || checkingAuth)
//     return (
//       <Box textAlign="center" mt={10}>
//         <CircularProgress sx={{ color: "#ea580c" }} />
//       </Box>
//     );

//   if (error)
//     return (
//       <Typography color="error" align="center" mt={5}>
//         Error: {error}
//       </Typography>
//     );

//   if (!course)
//     return (
//       <Typography align="center" mt={5}>
//         Course Not Found
//       </Typography>
//     );

//   return (
//     <>
//       <Box sx={{ minHeight: "100vh", backgroundColor: "#f1f5f9", py: 10 }}>
//         <Container maxWidth="md">
//           <Paper
//             elevation={0}
//             sx={{
//               p: 7,
//               borderRadius: 4,
//               backgroundColor: "#ffffff",
//               border: "1px solid #e2e8f0",
//             }}
//           >
//             {/* IMAGE */}
//             <Box
//               component="img"
//               src={`http://localhost:7000/${course.images?.[0]}`}
//               sx={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 3, mb: 4 }}
//             />

//             {/* TITLE & CATEGORY */}
//             <Typography variant="h4" fontWeight="600" mb={2}>
//               {course.courseName}
//             </Typography>
//             <Box mb={3}>
//               <Chip label={course.category?.name} sx={{ mr: 1, backgroundColor: "#fbdbb3", color: "#ea580c" }} />
//               <Chip label={course.subcategory?.name} />
//             </Box>


//             {/* COURSE DETAILS */}
//             <Grid container spacing={3} sx={{ mb: 4 }}>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="body2" color="text.secondary">Fees</Typography>
//                 <Typography fontWeight="600">₹ {course.fees}</Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="body2" color="text.secondary">Seats</Typography>
//                 <Typography fontWeight="600">{course.totalSeats}</Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="body2" color="text.secondary">Mode</Typography>
//                 <Typography fontWeight="600">{course.mode}</Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="body2" color="text.secondary">Location</Typography>
//                 <Typography fontWeight="600">{course.location}</Typography>
//               </Grid>
//             </Grid>

//             <Divider sx={{ mb: 4 }} />
//             <Typography mb={5}>{course.description}</Typography>

//             {/* BUTTONS */}
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Button fullWidth variant="outlined" onClick={handleEnquire} sx={{ borderColor: "#ea580c", color: "#ea580c", height: 50 }}>
//                   Enquire Now
//                 </Button>
//               </Grid>
//               <Grid item xs={6}>
//                 <Button
//                   fullWidth
//                   onClick={handleRegisterClick}
//                   variant="contained"
//                   disabled={course.totalSeats === 0}
//                   sx={{ background: "#ea580c", height: 50, "&:hover": { background: "#c2410c" } }}
//                 >
//                   {course.totalSeats === 0 ? "Sold Out" : "Register Now"}
//                 </Button>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Container>
//       </Box>

//       {/* REGISTRATION MODAL */}
//       <Modal open={openRegisterModal} onClose={() => setOpenRegisterModal(false)}>
//         <Box
//           sx={{
//             width: { xs: "95%", sm: 600 },
//             bgcolor: "#ffffff",
//             borderRadius: 3,
//             mx: "auto",
//             mt: "4%",
//             p: 3,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h5" fontWeight={700} mb={3}>
//             Confirm Your Registration
//           </Typography>

//           {/* Student Info */}
//           <Paper
//             variant="outlined"
//             sx={{ mb: 3, p: 2, borderLeft: "5px solid #1976d2", backgroundColor: "#f0f4ff" }}
//           >
//             {student ? (
//               <>
//                 <Typography variant="subtitle2" color="text.secondary">
//                   Student Name
//                 </Typography>
//                 <Typography variant="body1" fontWeight={600}>
//                   {student?.studentname}
//                 </Typography>

//                 <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
//                   Institution
//                 </Typography>
//                 <Typography variant="body1" fontWeight={600}>
//                   {course.institution.name|| "Not Provided"}
//                 </Typography>
//               </>
//             ) : (
//               <Typography>Loading student info...</Typography>
//             )}
//           </Paper>

//           {/* Course Info */}
//           <Paper
//             variant="outlined"
//             sx={{ mb: 3, p: 2, borderLeft: "5px solid #ea580c", backgroundColor: "#fff7ed" }}
//           >
//             <Typography variant="subtitle2" color="text.secondary">
//               Course Name
//             </Typography>
//             <Typography variant="body1" fontWeight={600}>
//               {course.courseName}
//             </Typography>

//             <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
//               Fees
//             </Typography>
//             <Typography variant="body1" fontWeight={600} color="#ea580c">
//               ₹ {course.fees}
//             </Typography>
//           </Paper>

//           {/* Payment */}
//           <TextField
//             fullWidth
//             select
//             label="Select Payment Method"
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//             sx={{ mb: 2 }}
//           >
//             <MenuItem value="UPI">UPI</MenuItem>
//             <MenuItem value="Card">Debit / Credit Card</MenuItem>
//             <MenuItem value="NetBanking">Net Banking</MenuItem>
//           </TextField>

//           <Box sx={{ mb: 2 }}>
//             <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <input
//                 type="checkbox"
//                 checked={acceptTerms}
//                 onChange={(e) => setAcceptTerms(e.target.checked)}
//               />
//               I agree to the terms & conditions
//             </label>
//           </Box>

//           {/* Footer Buttons */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//             <Button variant="outlined" onClick={() => setOpenRegisterModal(false)}>
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleSubmitRegistration}
//               disabled={!paymentMethod || !acceptTerms || registering || course.totalSeats === 0}
//               sx={{ backgroundColor: "#ea580c", "&:hover": { backgroundColor: "#ea580c" } }}
//             >
//               {registering ? "Processing..." : `Confirm & Pay ₹ ${course.fees}`}
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useCourseDetail from "../hooks/useCourseDetail";
import axios from "axios";

import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Divider,
  Paper,
  Button,
  CircularProgress,
  Modal,
  TextField,
  MenuItem,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

export default function CourseDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { course, loading, error } = useCourseDetail(id);

  const [student, setStudent] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [registering, setRegistering] = useState(false);

  /* ================= FEEDBACK STATE ================= */

  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);
const [alreadyEnquired, setAlreadyEnquired] = useState(false);

  

  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ================= MODAL ================= */

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleModalClose = () => setModalOpen(false);

  /* ================= CHECK LOGIN ================= */

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/profile", {
          withCredentials: true
        });

        setStudent(res.data.student);

      } catch {

        const saved = localStorage.getItem("student");

        if (saved) setStudent(JSON.parse(saved));
        else setStudent(null);

      } finally {
        setCheckingAuth(false);
      }
    };

    checkLogin();
  }, []);

  /* ================= FETCH FEEDBACK ================= */

  const fetchFeedback = async () => {
    try {

      const res = await axios.get(
        "http://localhost:7000/api/feedback/public-feedback"
      );

      const filtered = (res.data?.data || []).filter(
        (item) => item.courseid?._id === id
      );

      setFeedbacks(filtered);

const savedStudent = JSON.parse(localStorage.getItem("student"));

if (savedStudent) {
  const exists = filtered.find(
    (f) => f.studentid?._id === savedStudent._id
  );

  if (exists) setAlreadyFeedback(true);
}
    } catch (err) {
      console.log("Feedback fetch error:", err);
    } finally {
      setFeedbackLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [id]);

  /* ================= LOGIN REDIRECT REGISTER ================= */

  useEffect(() => {

    if (location.state?.openRegister && student) {
      setOpenRegisterModal(true);
      navigate(location.pathname, { replace: true });
    }

  }, [location.state, student, navigate]);

  /* ================= ENQUIRY BUTTON ================= */

  const handleEnquire = () => {

    const student = localStorage.getItem("student");

    if (student) {
      navigate(`/enquiry/${id}`);
    } else {
      navigate("/login", { state: { returnTo: `/enquiry/${id}` } });
    }

  };

  /* ================= REGISTER BUTTON ================= */

  const handleRegisterClick = () => {

    if (checkingAuth) return;

    if (!student) {

      navigate("/login", {
        state: {
          returnTo: `/course/${id}`,
          openRegister: true
        }
      });

      return;
    }

    setOpenRegisterModal(true);
  };

  /* ================= REGISTER COURSE ================= */

  const handleSubmitRegistration = async () => {

    if (!paymentMethod) {
      alert("Please select payment method");
      return;
    }

    if (!acceptTerms) {
      alert("Please accept terms");
      return;
    }

    try {

      setRegistering(true);

      await axios.post(
        "http://localhost:7000/api/register-course",
        {
          courseId: id,
          paymentMethod
        },
        { withCredentials: true }
      );

      alert("Registered Successfully");

      setOpenRegisterModal(false);
      setPaymentMethod("");
      setAcceptTerms(false);

    } catch (err) {

      if (err.response?.status === 401) {

        navigate("/login", {
          state: {
            returnTo: `/course/${id}`,
            openRegister: true
          }
        });

      } else {
        alert(err.message || "Server error");
      }

    } finally {

      setRegistering(false);

    }
  };

  /* ================= SUBMIT FEEDBACK ================= */

  const handleFeedbackSubmit = async () => {
    if (alreadyFeedback) {
  setModalMessage("You have already submitted feedback for this course");
  setModalOpen(true);
  return;
}

    const student = localStorage.getItem("student");

    if (!student) {
      navigate("/login", { state: { courseId: id } });
      return;
    }

    if (!rating || !message.trim()) {

      setModalMessage("Please provide rating and feedback message");
      setModalOpen(true);
      return;
    }

    setSubmitting(true);

    try {

      await axios.post(
        "http://localhost:7000/api/feedback/feedback",
        {
          rating,
          message,
          courseid: id
        },
        { withCredentials: true }
      );

      setModalMessage("Feedback submitted successfully");
      setModalOpen(true);

      setRating(0);
      setMessage("");

      fetchFeedback();

    } catch (err) {

      setModalMessage(
        err.response?.data?.message || "Failed to submit feedback"
      );

      setModalOpen(true);

    } finally {

      setSubmitting(false);

    }
  };

  /* ================= LOADING ================= */

  if (loading || checkingAuth)
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress sx={{ color: "#ea580c" }} />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" align="center" mt={5}>
        Error: {error}
      </Typography>
    );

  if (!course)
    return (
      <Typography align="center" mt={5}>
        Course Not Found
      </Typography>
    );

  const courseImage =
    course.images && course.images.length > 0
      ? course.images[0]
      : "default-course.jpg";

  /* ================= UI ================= */

  return (
    <>
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f1f5f9", py: 10 }}>
        <Container maxWidth="md">

          <Paper
            elevation={0}
            sx={{
              p: 7,
              borderRadius: 4,
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0"
            }}
          >

            <Box
              component="img"
              src={`http://localhost:7000/${courseImage}`}
              sx={{
                width: "100%",
                height: 260,
                objectFit: "cover",
                borderRadius: 3,
                mb: 4
              }}
            />

            <Typography variant="h4" fontWeight="600" mb={2}>
              {course.courseName}
            </Typography>

            <Box mb={3}>
              <Chip
                label={course.category?.name}
                sx={{
                  mr: 1,
                  backgroundColor: "#fbdbb3",
                  color: "#ea580c"
                }}
              />

              <Chip label={course.subcategory?.name} />
            </Box>

            <Grid container spacing={3} mb={4}>

              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Fees
                </Typography>
                <Typography fontWeight="600">₹ {course.fees}</Typography>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Seats
                </Typography>
                <Typography fontWeight="600">{course.totalSeats}</Typography>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Mode
                </Typography>
                <Typography fontWeight="600">{course.mode}</Typography>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Location
                </Typography>

                <Typography fontWeight="600">{course.location}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                 Duration
                </Typography>

                <Typography fontWeight="600">{course.duration}</Typography>
              </Grid>

            </Grid>

            <Divider sx={{ mb: 4 }} />
            <Typography mb={5}>{course.description}</Typography>
         
{/* ================= COURSE MODULES ================= */}

<Divider sx={{ mb: 4 }} />

<Typography variant="h5" fontWeight="600" mb={3}>
  Course Modules
</Typography>

{course.modules && course.modules.length > 0 ? (

  course.modules.map((module, index) => (

    <Paper
      key={index}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 2,
        border: "1px solid #e2e8f0",
        backgroundColor: "#f8fafc"
      }}
    >

      {/* Module Title */}

      <Typography
        variant="h6"
        fontWeight="600"
        sx={{ color: "#ea580c", mb: 1 }}
      >
        Module {index + 1}: {module.title}
      </Typography>

      {/* Module Description */}

      {module.description.map((desc, i) => (

        <Typography
          key={i}
          variant="body2"
          sx={{ ml: 2, mb: 0.5 }}
        >
          • {desc}
        </Typography>

      ))}

    </Paper>

  ))

) : (

  <Typography color="text.secondary">
    Modules not available for this course.
  </Typography>

)}

            {/* Buttons */}

            <Grid container spacing={2} mb={5}>

              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleEnquire}
                  sx={{
                    borderColor: "#ea580c",
                    color: "#ea580c",
                    height: 50
                  }}
                >
                  Enquire Now
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  fullWidth
                  onClick={handleRegisterClick}
                  variant="contained"
                  sx={{
                    background: "#ea580c",
                    height: 50,
                    "&:hover": { background: "#c2410c" }
                  }}
                >
                  Register Now
                </Button>
              </Grid>

            </Grid>

            <Divider sx={{ mb: 4 }} />

            {/* ================= FEEDBACK LIST ================= */}

            <Typography variant="h5" fontWeight="600" mb={3}>
              Student Feedback
            </Typography>

            {feedbackLoading ? (
              <CircularProgress />
            ) : feedbacks.length === 0 ? (
              <Typography>No feedback available.</Typography>
            ) : (
              feedbacks.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    mb: 3,
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0"
                  }}
                >
                 <Box
  key={item._id}
  sx={{
    mb: 3,
    p: 3,
    borderRadius: 2,
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0"
  }}
>

  {/* Name + Email */}

  <Typography fontWeight="600">
    {item.studentid?.studentname || "Student"}
  </Typography>

  <Typography variant="body2" color="text.secondary">
    {item.studentid?.email}
  </Typography>

  {/* Rating */}

  <Rating value={item.rating} readOnly precision={0.5} sx={{ mt: 1 }} />

  {/* Message */}

  <Typography mt={1}>{item.message}</Typography>

  {/* Date */}

  <Typography
    variant="caption"
    color="text.secondary"
    display="block"
    mt={1}
  >
    {item.createdAt
      ? new Date(item.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : "Date not available"}
  </Typography>

</Box>
                </Box>
              ))
            )}

            <Divider sx={{ my: 4 }} />

            {/* ADD FEEDBACK */}

            <Typography variant="h6" fontWeight="600" mb={2}>
              Add Your Feedback
            </Typography>

            <Rating
              value={rating}
              precision={0.5}
              onChange={(e, val) => setRating(val)}
            />

            <TextField
              multiline
              rows={3}
              fullWidth
              placeholder="Write your feedback..."
              sx={{ mt: 2 }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button
              variant="contained"
              sx={{ mt: 2, background: "#ea580c" }}
              fullWidth
              onClick={handleFeedbackSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </Button>

          </Paper>
        </Container>
      </Box>

      {/* REGISTER MODAL (UNCHANGED) */}

      {/* REGISTER MODAL */}

{/* REGISTRATION MODAL */}
      <Modal open={openRegisterModal} onClose={() => setOpenRegisterModal(false)}>
        <Box
          sx={{
            width: { xs: "95%", sm: 600 },
            bgcolor: "#ffffff",
            borderRadius: 3,
            mx: "auto",
            mt: "4%",
            p: 3,
            boxShadow: 24,
          }}
        >
          <Typography variant="h5" fontWeight={700} mb={3}>
            Confirm Your Registration
          </Typography>

          {/* Student Info */}
          <Paper variant="outlined" sx={{ mb: 3, p: 2, borderLeft: "5px solid #1976d2", backgroundColor: "#f0f4ff" }}>
            {student ? (
              <>
                <Typography variant="subtitle2" color="text.secondary">Student Name</Typography>
                <Typography variant="body1" fontWeight={600}>{student.studentname}</Typography>

                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>Institution</Typography>
                <Typography variant="body1" fontWeight={600}>{course.institution.name || "Not Provided"}</Typography>
              </>
            ) : (
              <Typography>Loading student info...</Typography>
            )}
          </Paper>

          {/* Course Info */}
          <Paper variant="outlined" sx={{ mb: 3, p: 2, borderLeft: "5px solid #ea580c", backgroundColor: "#fff7ed" }}>
            <Typography variant="subtitle2" color="text.secondary">Course Name</Typography>
            <Typography variant="body1" fontWeight={600}>{course.courseName}</Typography>

            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>Fees</Typography>
            <Typography variant="body1" fontWeight={600} color="#ea580c">₹ {course.fees}</Typography>
          </Paper>

          {/* Payment */}
          <TextField
            fullWidth
            select
            label="Select Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="UPI">UPI</MenuItem>
            <MenuItem value="Card">Debit / Credit Card</MenuItem>
            <MenuItem value="NetBanking">Net Banking</MenuItem>
          </TextField>

          <Box sx={{ mb: 2 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
              I agree to the terms & conditions
            </label>
          </Box>

          {/* Footer Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="outlined" onClick={() => setOpenRegisterModal(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSubmitRegistration}
              disabled={!paymentMethod || !acceptTerms || registering || course.totalSeats === 0}
              sx={{ backgroundColor: "#ea580c", "&:hover": { backgroundColor: "#ea580c" } }}
            >
              {registering ? "Processing..." : `Confirm & Pay ₹ ${course.fees}`}
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* SUCCESS MODAL */}

<Modal open={modalOpen} onClose={handleModalClose}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 380,
      bgcolor: "#ffffff",
      borderRadius: 3,
      p: 4,
      textAlign: "center",
      boxShadow: 24
    }}
  >
    {/* Tick Icon */}
    <Typography
      sx={{
        fontSize: 40,
        color: "#ea580c",
        fontWeight: "bold",
        mb: 1
      }}
    >
      ✓
    </Typography>

    {/* Title */}
    <Typography
      variant="h5"
      sx={{
        fontWeight: 700,
        color: "#0f172a",
        mb: 1
      }}
    >
     Thankyou for your feedback
    </Typography>

    {/* Message */}
    <Typography sx={{ color: "#475569", mb: 3 }}>
      {modalMessage}
    </Typography>

    {/* Button */}
    <Button
      fullWidth
      variant="contained"
      onClick={handleModalClose}
      sx={{
        backgroundColor: "#1e293b",
        height: 45,
        fontWeight: 600,
        "&:hover": {
          backgroundColor: "#0f172a"
        }
      }}
    >
      OK
    </Button>
  </Box>
</Modal>
      
    </>
    
  );
  
}