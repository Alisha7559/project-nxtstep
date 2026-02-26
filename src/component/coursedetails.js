import React from "react";
import { useParams } from "react-router-dom";
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
  CircularProgress
} from "@mui/material";


export default function CourseDetail() {
  const { id } = useParams();
  const { course, loading, error } = useCourseDetail(id);

  if (loading)
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress sx={{ color: "#f97316" }} />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" align="center">
        Error: {error}
      </Typography>
    );

  // return (
  //   <Box
  //     sx={{
  //       minHeight: "100vh",
  //       background: "linear-gradient(135deg, #ffffff, #ffffff)",
  //       py: 10
  //     }}
  //   >
  //     <Container maxWidth="md">
  //       <Paper
  //         elevation={0}
  //         sx={{
  //           p: 6,                 // 🔥 more inner padding
  //           borderRadius: 4,
  //           backgroundColor: "#ffffff",
  //           boxShadow: "0 20px 50px #0f172a",
            
  //         }}
  //       >
  return (
  <Box
    sx={{
      minHeight: "100vh",
      backgroundColor: "#f1f5f9", // soft light gray background
      py: 10
    }}
  >
    <Container maxWidth="md">
      <Paper
        elevation={0}
        sx={{
          p: 7,                         // more inner padding
          borderRadius: 4,
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",   // soft border instead of shadow
        }}
      >
          {/* IMAGE */}
          <Box
            component="img"
            src={`http://localhost:7000/${course.images?.[0]}`}
            sx={{
              width: "100%",
              height: 260,
              objectFit: "cover",
              borderRadius: 3,
              mb: 4
            }}
          />

          {/* TITLE */}
          <Typography
            variant="h4"
            fontWeight="600"
            sx={{ color: "#0f172a", mb: 2 }}
          >
            {course.courseName}
          </Typography>

          {/* CATEGORY CHIPS */}
          <Box mb={3}>
            <Chip
              label={course.category?.name}
              size="medium"
              sx={{
                mr: 1,
                backgroundColor: "#fbdbb3",
                color: "#f97316",
                fontWeight: 500
              }}
            />
            <Chip
              label={course.subcategory?.name}
              size="small"
              sx={{
                backgroundColor: "#f9f5f1",
                color: "#334155"
              }}
            />
          </Box>

          {/* INFO GRID */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
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

          {/* DESCRIPTION */}
          <Typography
            sx={{
              color: "#475569",
              lineHeight: 1.7,
              mb: 5
            }}
          >
            {course.description}
          </Typography>

          {/* BUTTONS */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  height: 50,
                  borderRadius: 2,
                  textTransform: "none",
                  borderColor: "#f97316",
                  color: "#f97316",
                  fontWeight: 500
                }}
              >
                Enquire Now
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  height: 50,
                  borderRadius: 2,
                  textTransform: "none",
                  backgroundColor: "#f97316",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#ea580c"
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