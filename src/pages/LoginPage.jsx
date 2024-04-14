import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

const API_URL = "http://localhost:4000";

const LoginPage = () => {
  // State to hold username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateLogin = () => {
    axios
      .get(`${API_URL}/users?username=${username}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.length === 0) {
          setError("Username does not exist. You should register first.");
        } else {
          const currentPassword = response.data[0].password;
          if (currentPassword !== password) {
            setError("Wrong Password");
          } else {
            localStorage.setItem("user", username);
            navigate("/arts", { state: { user: username } });
          }
        }
      })
      .catch((error) => console.log(error));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login Submitted");
    console.log("Username:", username);
    console.log("Password:", password);

    validateLogin();
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        If you do not have a Username, please,{" "}
        <Link to={"/register"}>Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
