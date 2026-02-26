import { useEffect, useState } from "react";

export default function useCourseDetail(id) {

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!id) return;

    const fetchCourse = async () => {

      try {

        const res = await fetch(
          `http://localhost:7000/api/course/${id}`,
          {
            credentials: "include"
          }
        );

        const data = await res.json();

        setCourse(data.data);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    };

    fetchCourse();

  }, [id]);

  return { course, loading, error };

}