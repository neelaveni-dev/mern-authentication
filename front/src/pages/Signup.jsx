import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful");
      navigate("/");
    }
     catch (err) {
        console.log(err);
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
  <div className="container">
    <h2>Signup</h2>

    <form onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Signup</button>
    </form>

    <p className="link-text">
      <Link to="/login">Already have an account?</Link>
    </p>
  </div>
);
}

export default Signup;