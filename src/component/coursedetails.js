// import React from "react";
// import { useParams } from "react-router-dom";
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
//   CircularProgress
// } from "@mui/material";


// export default function CourseDetail() {
//   const { id } = useParams();
//   const { course, loading, error } = useCourseDetail(id);

//   if (loading)
//     return (
//       <Box textAlign="center" mt={10}>
//         <CircularProgress sx={{ color: "#f97316" }} />
//       </Box>
//     );

//   if (error)
//     return (
//       <Typography color="error" align="center">
//         Error: {error}
//       </Typography>
//     );

//   // return (
//   //   <Box
//   //     sx={{
//   //       minHeight: "100vh",
//   //       background: "linear-gradient(135deg, #ffffff, #ffffff)",
//   //       py: 10
//   //     }}
//   //   >
//   //     <Container maxWidth="md">
//   //       <Paper
//   //         elevation={0}
//   //         sx={{
//   //           p: 6,                 // 🔥 more inner padding
//   //           borderRadius: 4,
//   //           backgroundColor: "#ffffff",
//   //           boxShadow: "0 20px 50px #0f172a",
            
//   //         }}
//   //       >
//   return (
//   <Box
//     sx={{
//       minHeight: "100vh",
//       backgroundColor: "#f1f5f9", // soft light gray background
//       py: 10
//     }}
//   >
//     <Container maxWidth="md">
//       <Paper
//         elevation={0}
//         sx={{
//           p: 7,                         // more inner padding
//           borderRadius: 4,
//           backgroundColor: "#ffffff",
//           border: "1px solid #e2e8f0",   // soft border instead of shadow
//         }}
//       >
//           {/* IMAGE */}
//           <Box
//             component="img"
//             src={`http://localhost:7000/${course.images?.[0]}`}
//             sx={{
//               width: "100%",
//               height: 260,
//               objectFit: "cover",
//               borderRadius: 3,
//               mb: 4
//             }}
//           />

//           {/* TITLE */}
//           <Typography
//             variant="h4"
//             fontWeight="600"
//             sx={{ color: "#0f172a", mb: 2 }}
//           >
//             {course.courseName}
//           </Typography>

//           {/* CATEGORY CHIPS */}
//           <Box mb={3}>
//             <Chip
//               label={course.category?.name}
//               size="small"
//               sx={{
//                 mr: 1,
//                 backgroundColor: "#fff7ed",
//                 color: "#f97316",
//                 fontWeight: 500
//               }}
//             />
//             <Chip
//               label={course.subcategory?.name}
//               size="small"
//               sx={{
//                 backgroundColor: "#f1f5f9",
//                 color: "#334155"
//               }}
//             />
//           </Box>

//           {/* INFO GRID */}
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             <Grid item xs={6} sm={3}>
//               <Typography variant="body2" color="text.secondary">
//                 Fees
//               </Typography>
//               <Typography fontWeight="600">
//                 ₹ {course.fees}
//               </Typography>
//             </Grid>

//             <Grid item xs={6} sm={3}>
//               <Typography variant="body2" color="text.secondary">
//                 Seats
//               </Typography>
//               <Typography fontWeight="600">
//                 {course.totalSeats}
//               </Typography>
//             </Grid>

//             <Grid item xs={6} sm={3}>
//               <Typography variant="body2" color="text.secondary">
//                 Mode
//               </Typography>
//               <Typography fontWeight="600">
//                 {course.mode}
//               </Typography>
//             </Grid>

//             <Grid item xs={6} sm={3}>
//               <Typography variant="body2" color="text.secondary">
//                 Location
//               </Typography>
//               <Typography fontWeight="600">
//                 {course.location}
//               </Typography>
//             </Grid>
//           </Grid>

//           <Divider sx={{ mb: 4 }} />

//           {/* DESCRIPTION */}
//           <Typography
//             sx={{
//               color: "#475569",
//               lineHeight: 1.7,
//               mb: 5
//             }}
//           >
//             {course.description}
//           </Typography>

//           {/* BUTTONS */}
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Button
//                 variant="outlined"
//                 fullWidth
//                 sx={{
//                   height: 50,
//                   borderRadius: 2,
//                   textTransform: "none",
//                   borderColor: "#f97316",
//                   color: "#f97316",
//                   fontWeight: 500
//                 }}
//               >
//                 Enquire Now
//               </Button>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Button
//                 variant="contained"
//                 fullWidth
//                 sx={{
//                   height: 50,
//                   borderRadius: 2,
//                   textTransform: "none",
//                   backgroundColor: "#f97316",
//                   fontWeight: 500,
//                   "&:hover": {
//                     backgroundColor: "#ea580c"
//                   }
//                 }}
//               >
//                 Register Now
//               </Button>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Container>
//     </Box>
//   );
// }
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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField
} from "@mui/material";

export default function CourseDetail() {

  const { id } = useParams();
  const { course, loading, error } = useCourseDetail(id);

  // ✅ popup state
  const [open, setOpen] = React.useState(false);

  // ✅ form state
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    qualification: "",
    description: ""
  });

  // ✅ open popup
  const handleOpen = () => {

    const token = localStorage.getItem("studentToken");

    if (!token) {

      alert("Please login first");

      return;

    }

    setOpen(true);

  };

  // ✅ close popup
  const handleClose = () => {

    setOpen(false);

  };

  // ✅ submit enquiry
  const submitEnquiry = async () => {

    try {

      const token = localStorage.getItem("studentToken");

      const res = await fetch("http://localhost:7000/api/enquiry", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`

        },

        body: JSON.stringify({

          studentName: form.name,

          phone: form.phone,

          qualification: form.qualification,

          description: form.description,

          courseId: id,

          instituteId: course.instituteId

        })

      });

      const data = await res.json();

      alert("Enquiry Submitted Successfully");

      setOpen(false);

    }

    catch (err) {

      console.log(err);

      alert("Error submitting enquiry");

    }

  };



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


  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        py: 10
      }}
    >
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


          {/* CATEGORY */}
          <Box mb={3}>
            <Chip
              label={course.category?.name}
              size="small"
              sx={{
                mr: 1,
                backgroundColor: "#fff7ed",
                color: "#f97316",
                fontWeight: 500
              }}
            />
            <Chip
              label={course.subcategory?.name}
              size="small"
              sx={{
                backgroundColor: "#f1f5f9",
                color: "#334155"
              }}
            />
          </Box>


          {/* GRID */}
          <Grid container spacing={3} sx={{ mb: 4 }}>

            <Grid item xs={6} sm={3}>
              <Typography variant="body2">Fees</Typography>
              <Typography fontWeight="600">₹ {course.fees}</Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="body2">Seats</Typography>
              <Typography fontWeight="600">{course.totalSeats}</Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="body2">Mode</Typography>
              <Typography fontWeight="600">{course.mode}</Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="body2">Location</Typography>
              <Typography fontWeight="600">{course.location}</Typography>
            </Grid>

          </Grid>


          <Divider sx={{ mb: 4 }} />


          {/* DESCRIPTION */}
          <Typography sx={{ mb: 5 }}>
            {course.description}
          </Typography>


          {/* BUTTONS */}
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>

              <Button
                variant="outlined"
                fullWidth
                onClick={handleOpen}
                sx={{
                  height: 50,
                  borderRadius: 2,
                  borderColor: "#f97316",
                  color: "#f97316"
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
                  backgroundColor: "#f97316"
                }}
              >

                Register Now

              </Button>

            </Grid>

          </Grid>


        </Paper>

      </Container>



      {/* ✅ ENQUIRY POPUP */}

      <Dialog open={open} onClose={handleClose} fullWidth>

        <DialogTitle>

          Course Enquiry

        </DialogTitle>


        <DialogContent>

          <TextField
            label="Student Name"
            fullWidth
            margin="dense"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />


          <TextField
            label="Phone"
            fullWidth
            margin="dense"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />


          <TextField
            label="Qualification"
            fullWidth
            margin="dense"
            onChange={(e) =>
              setForm({ ...form, qualification: e.target.value })
            }
          />


          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            margin="dense"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />


          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, background: "#f97316" }}
            onClick={submitEnquiry}
          >

            Submit

          </Button>


        </DialogContent>


      </Dialog>


    </Box>
  );

}