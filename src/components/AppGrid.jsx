import { Button, Grid, Group, Image, Paper, Text, Title } from "@mantine/core";
import classes from "../styles/AppGrid.module.css";
import { useNavigate } from "react-router-dom";

const AppGrid = ({ list, updateUserCart, userCart }) => {
  const navigate = useNavigate();
  return (
    <Grid
      overflow="hidden"
      justify="center"
      gutter={{ base: 10, xs: "md", md: "xl", xl: 30 }}
      className={classes.gridContainer}
    >
      {list.map((currentItem) => {
        const inCart = userCart?.indexOf(currentItem.id) >= 0;
        return (
          <Grid.Col
            key={currentItem.id}
            span={{ base: 12, sm: 6, md: 4, lg: 3 }}
          >
            <Paper
              p={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
              h={{ base: 450, md: 400 }}
              className={classes.card}
            >
              <div className={classes.cardImageContainer}>
                <Image
                  radius="xs"
                  w="auto"
                  src={currentItem.image}
                  fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                  onClick={() => navigate(`/arts/${currentItem.id}`)}
                  className={classes.cardImage}
                />
              </div>
              <Title order={5} mt="xs">
                {currentItem.title}
              </Title>
              <Group
                justify={{ base: "center", md: "flex-start" }}
                gap={2}
                align="center"
              >
                <Text size="sm">{currentItem.category}</Text> |
                <Text size="sm">{currentItem.size}</Text>
              </Group>
              <Group justify="space-between" align="center">
                <Text>{currentItem.price}€</Text>
                <Button
                  variant="outline"
                  size="xs"
                  color="light-dark(rgba(26, 25, 25, 1), orange)"
                  px="xs"
                  fz="xs"
                  className={classes.btn}
                  onClick={() => updateUserCart(currentItem.id, inCart)}
                >
                  {inCart ? "Remove from Cart" : "Add to Cart"}
                </Button>
              </Group>
            </Paper>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default AppGrid;
