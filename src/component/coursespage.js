
import { useEffect, useState } from "react";
import CourseCategorySection from "./coursecategory";
import Cards from "./cards";
import Head from "./header";

export default function CoursesPage() {

  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);


  useEffect(() => {

    fetch("http://localhost:7000/api/institute/allcourse", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {

        console.log("COURSES:", data.data);

        const mapped = data.data.map(course => ({

          id: course._id,

          image:
            course.images && course.images.length > 0
              ? `http://localhost:7000/${course.images[0]}`
              : "/placeholder.png",

          title: course.courseName,

          subtitle: course.category?.name || "General",

          features: [
            `Fees: ₹${course.fees}`,
            `Mode: ${course.mode}`,
            `Seats: ${course.totalSeats}`,
            `Level: ${course.level}`
          ]

        }));

        setCourses(mapped);
        setAllCourses(mapped);

      });

  }, []);

  return (
    <>
    <Head/>
      <CourseCategorySection
        courses={courses}
        setCourses={setCourses}
        allCourses={allCourses}
      />

      <Cards courses={courses} />    </>
  );
}