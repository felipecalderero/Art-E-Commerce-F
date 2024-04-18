import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  BackgroundImage,
} from "@mantine/core";
import classes from "../styles/AuthenticationTitle.module.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export function AuthenticationTitle() {
  // State to hold email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); // This hook allows you to access the state
  useEffect(() => {
    // Check if email is passed in state and set it
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const validateLogin = () => {
    setErrorEmail("");
    setErrorPassword("");
    axios
      .get(`${import.meta.env.VITE_API_URL}/users?email=${email}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.length === 0) {
          setErrorEmail("Email does not exist. You should register first.");
        } else {
          const userDetail = response.data[0];
          if (userDetail.password !== password) {
            setErrorPassword("Wrong Password");
          } else {
            // localStorage.setItem("user", email);
            localStorage.setItem(
              "user",
              JSON.stringify({
                userId: userDetail.id,
                userName: userDetail.name,
                email: email,
              })
            );
            navigate("/arts", { state: { user: email } });
          }
        }
      })
      .catch((error) => console.log(error));
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login Submitted");
    console.log("email:", email);
    console.log("Password:", password);

    if (!isValidEmail(email)) {
      setErrorEmail("Please enter a valid email address.");
      return; // Stop the form submission if the email is not valid
    }

    validateLogin();
  };

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <Container size={420} my={40}>
          <Title ta="center" className={classes.title}>
            Welcome to <br />
            Art-Market!
          </Title>
          <br />
          <Text c="#e6757d" size="sm" ta="center" mt={5}>
            Do not have an account yet?{" "}
            <Anchor size="sm" component="button">
              <Link to={"/register"}>Create account</Link>
            </Anchor>
          </Text>

          <Paper shadow="md" p={30} mt={30} radius="xl">
            <TextInput
              radius="xl"
              label="Email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              error={errorEmail}
            />
            <PasswordInput
              radius="xl"
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              error={errorPassword}
            />
            <Group justify="space-between" mt="lg">
              <Checkbox color="#e6757d" radius="md" label="Remember me" />
              <Anchor component="button" size="sm">
                <Link to={"/forgotpassword"}>Forgot password?</Link>
              </Anchor>
            </Group>
            <Button
              variant="filled"
              radius="xl"
              fullWidth
              color="#e6757d"
              mt="xl"
              onClick={handleSubmit}
            >
              <span className={classes.buttonText}>Sign in</span>
            </Button>
          </Paper>
        </Container>
      </div>
    </div>
  );
}
