import "./auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [message,setMessage] = useState("");
  const [error,setError] = useState("");

  const handleSignup = async ()=>{

    setMessage("");
    setError("");

    try{

      const res = await fetch(
        "http://localhost:7000/api/students/register",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await res.json();

      if(res.ok){

        setMessage("Account Created Successfully");

        setTimeout(()=>{
          navigate("/login");
        },1500);

      }
      else{
        setError(data.message || "Signup Failed");
      }

    }
    catch(err){
      setError("Server Error");
    }

  };

  return (

    <div className="auth-container">

      <h2>Create an Account</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

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

      <button onClick={handleSignup}>
        Create Account
      </button>

      {message && (
        <p className="success-message">
          {message}
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      <p className="auth-switch">
        Already have an account?

        <span onClick={()=>navigate("/login")}>
          {" "}Login
        </span>

      </p>

    </div>

  );

};

export default Signup;