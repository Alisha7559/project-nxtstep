import { useEffect, useState } from "react";
import CourseCategorySection from "./coursecategory";
import Cards from "./cards";
import Head from "./header";

export default function CoursesPage({ type }) {

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

        let courseData = data.data;

        if (type === "degree") {
          courseData = courseData.filter(course =>
            course.subcategory?.name?.toLowerCase() === "degree"
          );
        }

        const mapped = courseData.map(course => ({

          id: course._id,

          image:
            course.images && course.images.length > 0
              ? `http://localhost:7000/${course.images[0]}`
              : "/placeholder.png",

          title: course.courseName,

          subtitle: course.subcategory?.name || "General",

          features: [
            `Fees: ₹${course.fees}`,
            `Mode: ${course.mode}`,
            `Seats: ${course.totalSeats}`,
            `Duration: ${course.duration}`
          ]

        }));

        setCourses(mapped);
        setAllCourses(mapped);

      });

  }, [type]);

  return (
    <>
      <Head />

      <CourseCategorySection
        courses={courses}
        setCourses={setCourses}
        allCourses={allCourses}
      />

      <Cards courses={courses} />
    </>
  );
}