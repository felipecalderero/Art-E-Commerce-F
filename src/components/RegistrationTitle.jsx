import {
  TextInput,
  PasswordInput,
  Checkbox,
  Radio,
  RadioGroup,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import classes from "../styles/AuthenticationTitle.module.css";

const API_URL = "http://localhost:4000";

export function RegistrationTitle() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    let validationErrors = {};
    if (!name) validationErrors.name = "Name is required";
    if (!email) validationErrors.email = "Email is required";
    else if (!isValidEmail(email))
      validationErrors.email = "Invalid email format";
    if (!password) validationErrors.password = "Password is required";
    if (!role) validationErrors.role = "Please select your role";

    setErrors(validationErrors);

    // Check if there are any errors
    if (Object.keys(validationErrors).length > 0) return;

    // Send registration data to the server
    try {
      const response = await axios.post(`${API_URL}/users`, {
        name,
        email,
        password,
        role,
        cart: [],
      });
      console.log(response.data); // Handle the response from the server
      navigate("/login", { state: { email } }); // Navigate to login with email in state
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ ...errors, email: "Registration failed. Please try again." });
    }
  };

  return (
    <Container size={420} my={40}>
      <Title className={classes.title} ta="center">
        Create Your Account
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Name"
          placeholder="Your name"
          required
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          error={errors.name}
        />
        <TextInput
          label="Email"
          placeholder="example@domain.com"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          error={errors.email}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          error={errors.password}
        />
        <RadioGroup
          label="Role"
          required
          value={role}
          onChange={setRole}
          error={errors.role}
        >
          <Radio value="buyer" label="Buyer Only" />
          <Radio value="artist" label="Artist" />
        </RadioGroup>
        <Button fullWidth mt="xl" onClick={handleSubmit}>
          Register
        </Button>
        <Text align="center" size="sm" mt="md">
          Already have an account?{" "}
          <Anchor component={Link} to="/" size="sm">
            Sign in
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
