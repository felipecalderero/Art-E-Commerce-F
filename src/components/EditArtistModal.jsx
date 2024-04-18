import {
  Button,
  Image,
  PasswordInput,
  Select,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useState } from "react";
import no_photo from "../assets/images/no_photo.png";

const EditArtistModal = ({ artistDetails, updateArtistPersonalInfo }) => {
  const [name, setName] = useState(artistDetails.name);
  const [description, setDescription] = useState(
    artistDetails.description || ""
  );
  const [email, setEmail] = useState(artistDetails.email);
  const [password, setPassword] = useState(artistDetails.password);
  const [gender, setGender] = useState(artistDetails.gender);
  const [photo, setPhoto] = useState(
    artistDetails.photo ? artistDetails.photo : no_photo
  );

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate link format
  const isValidLink = (link) => {
    const linkRegex = /http[s]?:\/\/[^\s/$.?#].[^\s]*/;
    return linkRegex.test(link);
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
    if (photo && !isValidLink(photo)) validationErrors.photo = "Invalid URL";
    setErrors(validationErrors);

    // Check if there are any errors
    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      name,
      description,
      email,
      password,
      gender,
      photo,
    };
    updateArtistPersonalInfo(payload);
  };
  return (
    <Stack gap={15}>
      <TextInput
        label="Name"
        placeholder="Your name"
        required
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        error={errors.name}
      />
      <Textarea
        label="Discription"
        placeholder="Write about your self..."
        value={description}
        rows={4}
        onChange={(event) => setDescription(event.currentTarget.value)}
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
      <Select
        label="Gender"
        placeholder="Gender"
        data={["Female", "Male"]}
        value={gender}
        onChange={setGender}
      />
      <TextInput
        label="Photo"
        placeholder="Your Image URL"
        value={photo}
        onChange={(event) => setPhoto(event.currentTarget.value)}
        error={errors.photo}
      />

      <Image radius="xl" src={photo} h="25rem" mt="xl" />

      <Button
        fullWidth
        mt="xl"
        variant="outline"
        color="light-dark(black, orange)"
        onClick={handleSubmit}
      >
        Update Information
      </Button>
    </Stack>
  );
};

export default EditArtistModal;
