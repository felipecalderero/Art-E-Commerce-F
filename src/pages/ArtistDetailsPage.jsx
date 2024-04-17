import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BreadcrumbContext } from "../context/breadcrumb.context";
import {
  Button,
  Container,
  Flex,
  Group,
  Image,
  Modal,
  PasswordInput,
  Radio,
  RadioGroup,
  Stack,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import womanPlaceholder from "../assets/images/woman_placeholder.jpg";
import manPlaceholder from "../assets/images/man_placeholder.jpg";
import no_photo from "../assets/images/no_photo.png";
import { IconEdit } from "@tabler/icons-react";
import classes from "../styles/ArtistDetailsPage.module.css";
import ArtsGrid from "../components/ArtsGrid";
import { useDisclosure } from "@mantine/hooks";

const ArtistDetailsPage = () => {
  const artistId = parseInt(useParams().userId);
  const { setItemList } = useContext(BreadcrumbContext);
  const [artist, setArtist] = useState(null);

  let [opened, { open, close }] = useDisclosure(false);
  const editModal = { opened, open, close };
  [opened, { open, close }] = useDisclosure(false);
  const deleteModal = { opened, open, close };
  const [deleteArtId, setDeleteArtId] = useState(null);
  const [canDelete, setCanDelete] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [photo, setPhoto] = useState(no_photo);
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const isArtistLoggedIn = userId === artistId;
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    photo: "",
  });

  const navigate = useNavigate();

  const getArtist = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${artistId}?_embed=arts`)
      .then((response) => {
        const artist = response.data;
        setArtist(artist);
        setItemList([
          { title: "All Artists", url: "/artists" },
          { title: artist.name },
        ]);
        setName(artist.name);
        setEmail(artist.email);
        setPassword(artist.password);
        setRole(artist.role);
        setPhoto(artist.photo);
      })
      .catch((error) => console.log(error));
  };

  const updateArtDetail = (artId, inCartCount) => {
    setArtist({
      ...artist,
      arts: artist.arts.map((currentArt) => {
        if (currentArt.id === artId) {
          currentArt.inCart = inCartCount;
        }
        return currentArt;
      }),
    });
  };

  const confirmDelete = (artId, inCartCount) => {
    if (inCartCount === 0) setCanDelete(true);
    else setCanDelete(false);
    setDeleteArtId(artId);
    deleteModal.open();
  };

  const deleteArt = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/arts/${deleteArtId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setArtist({
          ...artist,
          arts: artist.arts.filter((item) => item.id != deleteArtId),
        });
        deleteModal.close();
        console.log("Art deleted sucessfully");
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.log("Error while deleting art: ", error);
    }
  };

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
        `${import.meta.env.VITE_API_URL}/users/${artist.id}`,
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
      navigate(`/users/${artist.id}`, { state: { email } }); // Navigate to login with email in state
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ ...errors, email: "Registration failed. Please try again." });
    }
  };

  useEffect(() => {
    getArtist();
  }, []);

  return (
    <>
      {artist ? (
        <>
          <Container className={classes.artistContainer}>
            <Flex
              gap={{ base: "30", md: rem(100) }}
              justify={{ base: "space-around", md: "space-between" }}
              align="center"
              direction="row"
              wrap={{ base: "wrap", md: "nowrap" }}
            >
              <div className={classes.left}>
                <Image
                  src={
                    artist.photo
                      ? artist.photo
                      : artist.gender === "female"
                      ? womanPlaceholder
                      : manPlaceholder
                  }
                  className={classes.userImg}
                  mt={{ base: rem(10), md: "nowrap" }}
                />
              </div>
              <Stack gap={rem(30)} w={{ base: rem(270), md: rem(600) }}>
                <Group justify="space-between">
                  <Title order={3} tt="uppercase">
                    {artist.name}
                  </Title>
                  {isArtistLoggedIn && (
                    <Button
                      w={50}
                      p={3}
                      variant="subtle"
                      color="light-dark(black, orange)"
                      onClick={editModal.open}
                    >
                      <IconEdit />
                    </Button>
                  )}
                </Group>

                <Text>{artist.description}</Text>
                <Flex
                  justify="space-between"
                  wrap={{ base: "wrap", md: "nowrap" }}
                >
                  <Stack gap={rem(10)}>
                    <Text size="sm">
                      <strong>Nationality:</strong> {artist.nationality}
                    </Text>
                    <Text size="sm">
                      <strong>Gender:</strong>{" "}
                      {artist.gender[0].toUpperCase() + artist.gender.slice(1)}
                    </Text>
                  </Stack>
                  <Stack gap={rem(10)}>
                    <Text size="sm">
                      <strong>Email:</strong> {artist.email}
                    </Text>
                  </Stack>
                </Flex>
              </Stack>
            </Flex>
          </Container>
          <>
            <Title order={2} ta="center">
              All Artworks by {artist.name}
            </Title>
            {artist.arts?.length ? (
              <ArtsGrid
                list={artist.arts}
                editDeleteShow={isArtistLoggedIn}
                confirmDelete={confirmDelete}
                updateArt={updateArtDetail}
              ></ArtsGrid>
            ) : (
              <Title order={5} ta="center" h={rem(50)}>
                No Art
              </Title>
            )}
            {isArtistLoggedIn && (
              <Group justify="center">
                <Button
                  variant="outline"
                  color="light-dark(black, orange)"
                  onClick={() => {
                    console.log("add art button clicked");
                  }}
                >
                  New Art
                </Button>
              </Group>
            )}
          </>
        </>
      ) : (
        <p>Loading details...</p> // Provide a loading state feedback
      )}
      <Modal
        opened={editModal.opened}
        onClose={editModal.close}
        title="Personal Information"
      >
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
      <Modal
        opened={deleteModal.opened}
        onClose={deleteModal.close}
        title="Confirm Deletion"
      >
        <Text>
          {canDelete
            ? "Are you sure you want to delete this item?"
            : "You can not delete this art. People have added to the cart"}
        </Text>
        <Button
          fullWidth
          mt="xl"
          onClick={canDelete ? deleteArt : deleteModal.close}
        >
          {canDelete ? "Delete" : "Ok"}
        </Button>
      </Modal>
    </>
  );
};

export default ArtistDetailsPage;
