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
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import womanPlaceholder from "../assets/images/woman_placeholder.jpg";
import manPlaceholder from "../assets/images/man_placeholder.jpg";
import { IconEdit } from "@tabler/icons-react";
import classes from "../styles/ArtistDetailsPage.module.css";
import ArtsGrid from "../components/ArtsGrid";

const ArtistDetailsPage = () => {
  const [artist, setArtist] = useState(null);
  const { userId } = useParams();
  const { setItemList } = useContext(BreadcrumbContext);

  const getArtist = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${userId}?_embed=arts`)
      .then((response) => {
        const artist = response.data;
        setArtist(artist);
        setItemList([
          { title: "All Artists", url: "/artists" },
          { title: artist.name },
        ]);
      })
      .catch((error) => console.log(error));
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
                  <Button
                    w={50}
                    p={3}
                    variant="subtle"
                    color="light-dark(black, orange)"
                    onClick={() => {
                      console.log("edit button clicked");
                    }}
                  >
                    <IconEdit />
                  </Button>
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
            {artist.arts && <ArtsGrid list={artist.arts}></ArtsGrid>}
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
          </>
        </>
      ) : (
        <p>Loading details...</p> // Provide a loading state feedback
      )}
    </>
  );
};

export default ArtistDetailsPage;
