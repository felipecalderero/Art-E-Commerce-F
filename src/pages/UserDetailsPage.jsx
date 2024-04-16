import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BreadcrumbContext } from "../context/breadcrumb.context";
import { Container, Flex, Image, Stack, Text, Title, rem } from "@mantine/core";
import classes from "../styles/UserDetailsPage.module.css";
import womanPlaceholder from "../assets/images/woman_placeholder.jpg";
import manPlaceholder from "../assets/images/man_placeholder.jpg";

const API_URL = "http://localhost:4000";

const UserDetailsPage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { setItemList } = useContext(BreadcrumbContext);

  const getUser = () => {
    axios
      .get(`${API_URL}/users/${userId}?_embed=arts`)
      .then((response) => {
        const currentUser = response.data;
        setUser(currentUser);
        setItemList([
          { title: "All Artists", url: "/artists" },
          { title: currentUser.name },
        ]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user ? (
        <Container className={classes.container}>
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
                  user.photo
                    ? user.photo
                    : user.gender === "female"
                    ? womanPlaceholder
                    : manPlaceholder
                }
                className={classes.userImg}
                mt={{ base: rem(10), md: "nowrap" }}
              />
            </div>
            <Stack gap={rem(30)} w={{ base: rem(270), md: rem(600) }}>
              <Title order={3} tt="uppercase">
                {user.name}
              </Title>
              <Text>{user.description}</Text>
              <Flex
                justify="space-between"
                wrap={{ base: "wrap", md: "nowrap" }}
              >
                <Stack gap={rem(10)}>
                  <Text size="sm">
                    <strong>Nationality:</strong> {user.nationality}
                  </Text>
                  <Text size="sm">
                    <strong>Role:</strong>
                    {user.role[0].toUpperCase() + user.role.slice(1)}
                  </Text>
                </Stack>
                <Stack gap={rem(10)}>
                  <Text size="sm">
                    <strong>Email:</strong> {user.email}
                  </Text>
                  <Text size="sm">
                    <strong>Gender:</strong>{" "}
                    {user.gender[0].toUpperCase() + user.gender.slice(1)}
                  </Text>
                </Stack>
              </Flex>
            </Stack>
          </Flex>
        </Container>
      ) : (
        <p>Loading details...</p> // Provide a loading state feedback
      )}
    </>
    // <>
    //   {user ? (
    //     <>
    //       <h1>Artist: {user.username} </h1>
    //       <h2>Role: {user.role}</h2>
    //       <ul>
    //         {user.arts &&
    //           user.arts.map((currentArt, index) => (
    //             <li key={index}>
    //               <Link to={"/arts/" + currentArt.id}>
    //                 <h3 key={index}>{currentArt.title}</h3>
    //               </Link>
    //             </li>
    //           ))}
    //       </ul>
    //       <button
    //         type="button"
    //         onClick={() => {
    //           navigate("/");
    //         }}
    //       >
    //         Back to All Paintings
    //       </button>
    //       <button
    //         type="button"
    //         onClick={() => {
    //           navigate("/artists");
    //         }}
    //       >
    //         Back to All Artists
    //       </button>
    //     </>
    //   ) : (
    //     <p>Loading user details...</p> // Provide a loading state feedback
    //   )}
    // </>
  );
};

export default UserDetailsPage;
