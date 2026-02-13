import "./auth.css";

const Signup = () => {
  return (
    <div className="auth-container">
      <h2>Create an Account 🚀</h2>

      <input type="text" placeholder="Full Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button>Create Account</button>

      <p>
        Already have an account? <span>Login</span>
      </p>
    </div>
  );
};

export default Signup;
