import { Grid, Image, Paper, Text, Title } from "@mantine/core";
import classes from "../styles/AppGrid.module.css";

const AppGrid = ({ list }) => {
  return (
    <Grid
      overflow="hidden"
      justify="center"
      gutter={{ base: 10, xs: "md", md: "xl", xl: 30 }}
      className={classes.gridContainer}
      // grow
    >
      {list.map((currentItem) => {
        return (
          <Grid.Col key={currentItem.id} span={{ base: 12, md: 6, lg: 3 }}>
            <Paper shadow="xs" p="xl" withBorder className={classes.card}>
              <div className={classes.cardImageContainer}>
                <Image
                  radius="xs"
                  src={currentItem.image}
                  fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                  className={classes.cardImage}
                />
              </div>
              <Title order={4}>{currentItem.title}</Title>
              <Text>{currentItem.category}</Text>
              <Text>{currentItem.size}</Text>
            </Paper>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default AppGrid;
