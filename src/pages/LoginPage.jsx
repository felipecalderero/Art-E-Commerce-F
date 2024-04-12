import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const API_URL = "http://localhost:4000";

const LoginPage = () => {
  // State to hold username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateLogin = () => {
    axios
      .get(`${API_URL}/users?usename=${username}`)
      .then((response) => {
        const currentPassword = response.data.password;
        console.log(response.data);
        if (response.data.length === 0) {
          console.log("Username does not exist. Please, regiter first.");
        } else if (currentPassword !== password) {
          console.log("Wrong Password");
        } else {
          console.log("User and password are ok");
          navigate("/arts");
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
