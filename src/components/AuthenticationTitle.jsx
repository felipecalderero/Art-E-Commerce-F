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
} from "@mantine/core";
import classes from "../styles/AuthenticationTitle.module.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:4000";

export function AuthenticationTitle() {
  // State to hold username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const navigate = useNavigate();

  const validateLogin = () => {
    setErrorEmail("");
    setErrorPassword("");

    axios
      .get(`${API_URL}/users?username=${username}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.length === 0) {
          setErrorEmail("Username does not exist. You should register first.");
        } else {
          const currentPassword = response.data[0].password;
          if (currentPassword !== password) {
            setErrorPassword("Wrong Password");
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
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome to Art-Market!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          <Link to={"/register"}>Create account</Link>
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Username"
          placeholder="my_username"
          required
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          error={errorEmail}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          error={errorPassword}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleSubmit}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
