import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "../styles/PaintingDetailsPage.module.css";
import womanPlaceholder from "../assets/images/woman_placeholder.jpg";
import manPlaceholder from "../assets/images/man_placeholder.jpg";
import { UserContext } from "../context/user.context";
import { BreadcrumbContext } from "../context/breadcrumb.context";

import axios from "axios";
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

const API_URL = "http://localhost:4000";

const PaintingDetailsPage = () => {
  const [art, setArt] = useState(null);
  const artId = parseInt(useParams().artId);

  const { userDetails, updateUserDetails } = useContext(UserContext);
  const inCart = userDetails.cart?.indexOf(artId) < 0 ? false : true;
  const { setItemList } = useContext(BreadcrumbContext);

  const getArt = () => {
    axios
      .get(`${API_URL}/arts/${artId}`)
      .then((response) => {
        const currentArt = response.data;
        setArt(currentArt);
        setItemList([
          { title: "All Painting", url: "/arts" },
          { title: currentArt.title },
        ]);
      })
      .catch((error) => console.log(error));
  };

  const handleCartButtonClick = () => {
    const { cart } = JSON.parse(JSON.stringify(userDetails));
    if (inCart) {
      cart.splice(cart.indexOf(artId), 1);
    } else {
      cart.push(artId);
    }
    const payload = { cart };
    updateUserDetails(payload);
  };

  useEffect(() => {
    getArt();
  }, []);

  return (
    <>
      {art ? (
        <Container className={classes.container}>
          <Flex
            gap={{ base: "30", md: rem(100) }}
            justify={{ base: "space-around", md: "space-between" }}
            align="center"
            direction="row"
            wrap={{ base: "wrap", md: "nowrap" }}
          >
            {/* <Button
              visibleFrom="md"
              variant="outline"
              style={{ alignSelf: "flex-start" }}
              color="light-dark(rgba(26, 25, 25, 1), orange)"
              w={55}
              p={10}
              onClick={() => {
                navigate("/arts");
              }}
            >
              <IconArrowLeft stroke={1} />
            </Button> */}
            <div className={classes.left}>
              <Image
                src={art.image}
                className={classes.artImg}
                mt={{ base: rem(10), md: "nowrap" }}
              />
            </div>
            <Stack gap={rem(30)} w={{ base: rem(270), md: rem(600) }}>
              <Stack gap={rem(20)}>
                <div>
                  <Title order={3} tt="uppercase">
                    {art.title}
                  </Title>
                  <Text size="md" fw={500} fs="italic">
                    by {art.artist}
                  </Text>
                </div>
                <Text size="md">{art.description}</Text>
              </Stack>
              <Flex
                justify="space-between"
                wrap={{ base: "wrap", md: "nowrap" }}
              >
                <Stack gap={rem(10)}>
                  <Text size="sm">Medium: {art.category}</Text>
                  <Text size="sm">Size: {art.size}cm</Text>
                  {art.date && <Text size="sm">Year: {art.date}</Text>}
                </Stack>
                <Link to={"/users/" + art.userId}>
                  <Image
                    src={
                      art.photo
                        ? art.photo
                        : art.gender === "female"
                        ? womanPlaceholder
                        : manPlaceholder
                    }
                    w={rem(130)}
                    h={rem(130)}
                    classNames={{ root: classes.artistImg }}
                  ></Image>
                </Link>
              </Flex>
              <Container size="xxl" className={classes.details}>
                <Group justify="space-between" h={rem(40)}>
                  <Text size="sm">Get to know the artist:</Text>
                  <Link to={"/users/" + art.userId} className={classes.link}>
                    <Text size="sm">{art.artist}</Text>
                  </Link>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">Delivery time:</Text>
                  <Text size="sm">up to 14 days after purchase</Text>
                </Group>
                <div
                  style={{ borderTop: "1px solid #ccc", margin: "20px 0" }}
                />
                <Group justify="space-between">
                  <Text fw={700} fz={25}>
                    {art.price}€
                  </Text>
                  <Button
                    variant="outline"
                    color="black"
                    onClick={handleCartButtonClick}
                  >
                    {inCart ? "Remove from Cart" : "Add to Cart"}
                  </Button>
                </Group>
              </Container>
            </Stack>
          </Flex>
        </Container>
      ) : (
        <p>Loading details...</p> // Provide a loading state feedback
      )}
    </>
  );
};

export default PaintingDetailsPage;
