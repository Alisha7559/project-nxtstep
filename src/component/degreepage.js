import Head from "./header";
import Degrees from "./degrees";

export default function DegreePage() {

  return (
    <>
      <Head />

      <h2 style={{ textAlign: "center", margin: "40px 0" }}>
        All Degree Programs
      </h2>

      {/* SHOW ALL DEGREES */}
      <Degrees />

    </>
  );
}