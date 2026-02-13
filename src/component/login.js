import "./auth.css";

const Login = () => {
  return (
    <div className="auth-container">
      <h2>Welcome Back 👋</h2>

      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button>Login</button>

      <p>
        Don’t have an account? <span>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;
