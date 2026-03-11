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

  // =========================
  // CHECK IF LOGGED IN
  // =========================
  useEffect(() => {
  const checkLogin = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/profile", {
        withCredentials: true,
      });
      setStudent(res.data.student);
    } catch {
      // fallback to localStorage
      const saved = localStorage.getItem("student");
      if (saved) setStudent(JSON.parse(saved));
      else setStudent(null);
    } finally {
      setCheckingAuth(false);
    }
  };
  checkLogin();
}, []);

  // =========================
  // AUTO OPEN MODAL AFTER LOGIN REDIRECT
  // =========================
  useEffect(() => {
  if (location.state?.openRegister && student) {
    setOpenRegisterModal(true);
    navigate(location.pathname, { replace: true }); // remove state after using it
  }
}, [location.state, student, navigate]);

  // =========================
  // BUTTON HANDLERS
  // =========================
  const handleEnquire = () => {
    navigate(`/enquiry/${id}`);
  };

  const handleRegisterClick = () => {
  if (checkingAuth) return; // wait until auth check finishes

  if (!student) {
    navigate("/login", {
      state: { returnTo: `/course/${id}`, openRegister: true },
    });
    return;
  }

  setOpenRegisterModal(true);
};

  const handleSubmitRegistration = async () => {
    if (!paymentMethod) {
      alert("Please select payment method");
      return;
    }
    if (!acceptTerms) {
      alert("Please accept terms & conditions");
      return;
    }

    try {
      setRegistering(true);
      const response = await axios.post(
        "http://localhost:7000/api/register-course",
        { courseId: id, paymentMethod },
        { withCredentials: true }
      );

      alert("Registered Successfully");
      setOpenRegisterModal(false);
      setPaymentMethod("");
      setAcceptTerms("");
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login", {
          state: {
            returnTo: `/course/${id}`,
            openRegister: true,
          },
        });
      } else {
        alert(err.response?.data?.message || "Server error");
      }
    } finally {
      setRegistering(false);
    }
  };

  // =========================
  // LOADING & ERROR STATES
  // =========================
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
              border: "1px solid #e2e8f0",
            }}
          >
            {/* IMAGE */}
            <Box
              component="img"
              src={`http://localhost:7000/${course.images?.[0]}`}
              sx={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 3, mb: 4 }}
            />

            {/* TITLE & CATEGORY */}
            <Typography variant="h4" fontWeight="600" mb={2}>
              {course.courseName}
            </Typography>
            <Box mb={3}>
              <Chip label={course.category?.name} sx={{ mr: 1, backgroundColor: "#fbdbb3", color: "#ea580c" }} />
              <Chip label={course.subcategory?.name} />
            </Box>


            {/* COURSE DETAILS */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Fees</Typography>
                <Typography fontWeight="600">₹ {course.fees}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Seats</Typography>
                <Typography fontWeight="600">{course.totalSeats}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Mode</Typography>
                <Typography fontWeight="600">{course.mode}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Location</Typography>
                <Typography fontWeight="600">{course.location}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ mb: 4 }} />
            <Typography mb={5}>{course.description}</Typography>

            {/* BUTTONS */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" onClick={handleEnquire} sx={{ borderColor: "#ea580c", color: "#ea580c", height: 50 }}>
                  Enquire Now
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  onClick={handleRegisterClick}
                  variant="contained"
                  disabled={course.totalSeats === 0}
                  sx={{ background: "#ea580c", height: 50, "&:hover": { background: "#c2410c" } }}
                >
                  {course.totalSeats === 0 ? "Sold Out" : "Register Now"}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

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
          <Paper
            variant="outlined"
            sx={{ mb: 3, p: 2, borderLeft: "5px solid #1976d2", backgroundColor: "#f0f4ff" }}
          >
            {student ? (
              <>
                <Typography variant="subtitle2" color="text.secondary">
                  Student Name
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {student?.studentname}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                  Institution
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {course.institution.name|| "Not Provided"}
                </Typography>
              </>
            ) : (
              <Typography>Loading student info...</Typography>
            )}
          </Paper>

          {/* Course Info */}
          <Paper
            variant="outlined"
            sx={{ mb: 3, p: 2, borderLeft: "5px solid #ea580c", backgroundColor: "#fff7ed" }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Course Name
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {course.courseName}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
              Fees
            </Typography>
            <Typography variant="body1" fontWeight={600} color="#ea580c">
              ₹ {course.fees}
            </Typography>
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
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              I agree to the terms & conditions
            </label>
          </Box>

          {/* Footer Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="outlined" onClick={() => setOpenRegisterModal(false)}>
              Cancel
            </Button>
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
    </>
  );
}