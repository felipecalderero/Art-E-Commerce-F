import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  TextInput,
  PasswordInput,
  Radio,
  RadioGroup,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Image,
} from "@mantine/core";

//___________________

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import no_photo from "../assets/images/no_photo.png";

const UserDetailsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [photo, setPhoto] = useState(no_photo);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    photo: "",
  });

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const { userId } = useParams();

  const [opened, { open, close }] = useDisclosure(false);

  const getUser = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${userId}?_embed=arts`)
      .then((response) => {
        const currentUser = response.data;
        setUser(currentUser);
        setName(currentUser.name);
        setEmail(currentUser.email);
        setPassword(currentUser.password);
        setRole(currentUser.role);
        setPhoto(currentUser.photo);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
  }, []);

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
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        {
          name,
          email,
          password,
          role,
          cart: [],
          photo,
        }
      );
      console.log(response.data); // Handle the response from the server
      navigate(`/users/${user.id}`, { state: { email } }); // Navigate to login with email in state
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ ...errors, email: "Registration failed. Please try again." });
    }
  };

  return (
    <>
      {user ? (
        <>
          <h1>Artist: {user.username} </h1>
          <h2>Role: {user.role}</h2>
          <ul>
            {user.arts &&
              user.arts.map((currentArt, index) => (
                <li key={index}>
                  <Link to={"/arts/" + currentArt.id}>
                    <h3 key={index}>{currentArt.title}</h3>
                  </Link>
                </li>
              ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to All Paintings
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/artists");
            }}
          >
            Back to All Artists
          </button>

          <Modal opened={opened} onClose={close} title="Personal Information">
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

            <TextInput
              label="Photo"
              placeholder="your_image_url"
              value={photo}
              onChange={(event) => setPhoto(event.currentTarget.value)}
              error={errors.photo}
            />

            <Image radius="xl" src={photo} />

            <Button fullWidth mt="xl" onClick={handleSubmit}>
              Update Personal Information
            </Button>
          </Modal>

          <Button onClick={open}>Open modal</Button>
        </>
      ) : (
        <p>Loading user details...</p> // Provide a loading state feedback
      )}
    </>
  );
};

export default UserDetailsPage;
