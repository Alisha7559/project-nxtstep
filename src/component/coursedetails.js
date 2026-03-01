import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCourseDetail from "../hooks/useCourseDetail";

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
} from "@mui/material";

export default function CourseDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { course, loading, error } = useCourseDetail(id);

  /* ================= ENQUIRE BUTTON ================= */

  const handleEnquire = () => {
  if (!course) return;

  // Check if token cookie exists (simple check)
  const isLoggedIn = document.cookie.includes("token");

  if (isLoggedIn) {
    navigate(`/enquiry/${course._id}`);
  } else {
    navigate("/login", {
      state: {
        courseId: course._id
      }
    });
  }
};


  /* ================= LOADING ================= */

  if (loading)
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress sx={{ color: "#f97316" }} />
      </Box>
    );

  /* ================= ERROR ================= */

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

  /* ================= UI ================= */

  return (
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

          <Box
            component="img"
            src={`http://localhost:7000/${course.images?.[0]}`}
            sx={{
              width: "100%",
              height: 260,
              objectFit: "cover",
              borderRadius: 3,
              mb: 4,
            }}
          />

          <Typography variant="h4" fontWeight="600" mb={2}>
            {course.courseName}
          </Typography>

          <Box mb={3}>
            <Chip
              label={course.category?.name}
              size="small"
              sx={{
                mr: 1,
                backgroundColor: "#fff7ed",
                color: "#f97316",
              }}
            />
            <Chip
              label={course.subcategory?.name}
              size="small"
            />
          </Box>

          <Grid container spacing={3} mb={4}>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Fees
              </Typography>
              <Typography fontWeight="600">
                ₹ {course.fees}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Seats
              </Typography>
              <Typography fontWeight="600">
                {course.totalSeats}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Mode
              </Typography>
              <Typography fontWeight="600">
                {course.mode}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Location
              </Typography>
              <Typography fontWeight="600">
                {course.location}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 4 }} />

          <Typography mb={5}>
            {course.description}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleEnquire}
                sx={{
                  borderColor: "#f97316",
                  color: "#f97316",
                  height: 50,
                  "&:hover": {
                    borderColor: "#ea580c",
                    backgroundColor: "#fff7ed"
                  }
                }}
              >
                Enquire Now
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  background: "#f97316",
                  height: 50,
                  "&:hover": {
                    background: "#ea580c"
                  }
                }}
              >
                Register Now
              </Button>
            </Grid>
          </Grid>

        </Paper>
      </Container>
    </Box>
  );
}