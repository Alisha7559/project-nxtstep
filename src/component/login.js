import "./auth.css";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {

      const res = await fetch(
        "http://localhost:7000/api/students/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ STORE LOGIN DATA
      localStorage.setItem("student", JSON.stringify(data.student));
      localStorage.setItem("isLoggedIn", "true");

      // 🔥 Force Navbar update
      window.dispatchEvent(new Event("storage"));

      // ✅ Redirect back
      if (location.state?.courseId) {
        navigate(`/enquiry/${location.state.courseId}`);
      } else {
        navigate("/courses");
      }

    } catch {
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p style={{color:"red"}}>{error}</p>}

      {/* ✅ SIGNUP OPTION */}
      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "#1976d2", fontWeight: "bold" }}>
          Sign Up
        </Link>
      </p>

    </div>
  );
};

export default Login;