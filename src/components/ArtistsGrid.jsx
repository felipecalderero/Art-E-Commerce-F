import { Grid, Image, Paper, Stack, Text, Title } from "@mantine/core";
import classes from "../styles/ArtistsGrid.module.css";
import { useNavigate } from "react-router-dom";
import womanPlaceholder from "../assets/images/woman_placeholder.jpg";
import manPlaceholder from "../assets/images/man_placeholder.jpg";

const ArtistsGrid = ({ list }) => {
  console.log(list);
  const navigate = useNavigate();
  return (
    <Grid
      overflow="hidden"
      justify="center"
      gutter={{ base: 10, xs: "md", md: "xl", xl: 30 }}
      className={classes.gridContainer}
    >
      {list.map((currentUser) => {
        return (
          <Grid.Col
            key={currentUser.id}
            span={{ base: 12, sm: 6, md: 4, lg: 3 }}
          >
            <Paper
              p={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
              h={{ base: 450, md: 400 }}
              className={classes.card}
            >
              <div className={classes.cardImageContainer}>
                <Image
                  radius="40%"
                  src={
                    currentUser.photo
                      ? currentUser.photo
                      : currentUser.gender === "female"
                      ? womanPlaceholder
                      : manPlaceholder
                  }
                  onClick={() => navigate(`/users/${currentUser.id}`)}
                  className={classes.cardImage}
                />
              </div>
              <Stack justify="flex-start" align="center">
                <Title order={5} mt="xs">
                  {currentUser.name}
                </Title>
                <Text size="sm">{currentUser.nationality}</Text>
              </Stack>
            </Paper>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default ArtistsGrid;
