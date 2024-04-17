import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BreadcrumbContext } from "../context/breadcrumb.context";
import {
  Button,
  Container,
  Flex,
  Group,
  Image,
  Modal,
  ScrollArea,
  // PasswordInput,
  // Radio,
  // RadioGroup,
  Stack,
  Text,
  // TextInput,
  Title,
  rem,
} from "@mantine/core";
import womanPlaceholder from "../assets/images/woman_placeholder.jpg";
import manPlaceholder from "../assets/images/man_placeholder.jpg";
import { IconEdit } from "@tabler/icons-react";
import classes from "../styles/ArtistDetailsPage.module.css";
import ArtsGrid from "../components/ArtsGrid";
import { useDisclosure } from "@mantine/hooks";
import AddEditArtModal from "../components/AddEditArtModal";
import EditArtistModal from "../components/EditArtistModal";
import DeleteArtModal from "../components/DeleteArtModal";

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
  [opened, { open, close }] = useDisclosure(false);
  const addEditModal = { opened, open, close };
  const [artDetail, setArtDetail] = useState({
    title: "",
    description: "",
    category: "",
    size: "",
    date: "",
    image: "",
    userId: artistId,
    price: 0,
    inCart: 0,
  });
  const [isNewArt, setIsNewArt] = useState(true);

  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const isArtistLoggedIn = userId === artistId;

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
        // setName(artist.name);
        // setEmail(artist.email);
        // setPassword(artist.password);
        // setRole(artist.role);
        // setPhoto(artist.photo);
      })
      .catch((error) => console.log(error));
  };

  const editArt = (artDetail) => {
    setArtDetail(artDetail);
    setIsNewArt(false);
    addEditModal.open();
  };

  const closeAddEditModal = () => {
    setArtDetail({
      title: "",
      description: "",
      category: "",
      size: "",
      date: "",
      image: "",
      userId: artistId,
      price: 0,
      inCart: 0,
    });
    addEditModal.close();
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

  const updateArtist = async (payload) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${artist.id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setArtist({ ...artist, ...responseData });
        editModal.close();
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.error(
        "Error occured while updating user info:",
        JSON.stringify(error)
      );
      // setErrors({ ...errors, email: "Registration failed. Please try again." });
    }
  };

  const addUpdateArt = async (payload) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL.concat(
          isNewArt ? `/arts` : `/arts/${artDetail.id}`
        ),
        {
          method: isNewArt ? "POST" : "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log("Data saved successfully");
        if (isNewArt) {
          setArtist({ ...artist, arts: [...artist.arts, responseData] });
        } else {
          setArtist({
            ...artist,
            arts: artist.arts.map((currentArt) => {
              if (currentArt.id === responseData.id) {
                return { ...currentArt, ...responseData };
              }
              return currentArt;
            }),
          });
        }
        closeAddEditModal();
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.error("Error while add/update art:", error);
    }
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
                page={"artist"}
                confirmDelete={confirmDelete}
                updateArt={updateArtDetail}
                editArt={editArt}
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
                    setIsNewArt(true);
                    addEditModal.open();
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

      {/* Update artist modal */}
      <Modal
        opened={editModal.opened}
        onClose={editModal.close}
        size="auto"
        title="Personal Information"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <EditArtistModal artistDetails={artist} updateArtist={updateArtist} />
      </Modal>

      {/* Delete art modal */}
      <Modal
        opened={deleteModal.opened}
        onClose={deleteModal.close}
        title="Confirm Deletion"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <DeleteArtModal
          canDelete={canDelete}
          deleteArt={deleteArt}
          closeModal={deleteModal.close}
        />
      </Modal>

      {/* Update art modal */}
      <Modal
        opened={addEditModal.opened}
        onClose={() => {
          closeAddEditModal();
        }}
        title="Art Details"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <AddEditArtModal
          isNew={isNewArt}
          artDetail={artDetail}
          addUpdateArt={addUpdateArt}
        />
      </Modal>
    </>
  );
};

export default ArtistDetailsPage;
