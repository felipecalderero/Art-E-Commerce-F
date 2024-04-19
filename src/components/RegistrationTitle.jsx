import {
  TextInput,
  PasswordInput,
  Radio,
  CheckIcon,
  RadioGroup,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import classes from "../styles/RegisterTitle.module.css";

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          name,
          email,
          password,
          role,
          cart: [],
        }
      );
      console.log(response.data); // Handle the response from the server
      navigate("/login", { state: { email } }); // Navigate to login with email in state
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ ...errors, email: "Registration failed. Please try again." });
    }
  };

  return (
    <div className={classes.background}>
      <Container size={420} my={40}>
        <Title className={classes.title} ta="center" textWrap="wrap">
          Create <br />
          Your Account
        </Title>
        <Paper shadow="md" p={30} mt={30} radius="xl">
          <TextInput
            styles={{
              input: {
                backgroundColor: "#e7f0fe", // Set background color to white
              },
            }}
            variant="filled"
            radius="xl"
            label="Name"
            placeholder="Your name"
            required
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            error={errors.name}
          />
          <TextInput
            variant="filled"
            radius="xl"
            label="Email"
            placeholder="example@domain.com"
            required
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            error={errors.email}
          />
          <PasswordInput
            variant="filled"
            radius="xl"
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
            <Radio
              icon={CheckIcon}
              color="#e6757d"
              value="buyer"
              label="Buyer Only"
              mb={rem(5)}
            />
            <Radio
              icon={CheckIcon}
              color="#e6757d"
              value="artist"
              label="Artist"
            />
          </RadioGroup>
          <Button
            variant="filled"
            radius="xl"
            v
            fullWidth
            color="#e6757d"
            mt="xl"
            onClick={handleSubmit}
          >
            <span className={classes.buttonText}>Register</span>
          </Button>
          <Text align="center" size="sm" mt="md">
            Already have an account?{" "}
            <Anchor component={Link} to="/" size="sm">
              Sign in
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </div>
  );
}
