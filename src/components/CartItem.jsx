import classes from "../styles/CartItem.module.css";
import { Button, Image } from "@mantine/core";

const CartItem = ({ art, handleDelete }) => {
  return (
    <div className={classes.carCtn}>
      <Image fit="cover" src={art.image} />
      <div className={classes.textCtn}>
        <h1>
          {art.title} (Art Id: {art.id})
        </h1>
        <h2>Artist: {art.userId}</h2>
        <h3>Size: {art.size}cm</h3>
        <h4>
          Price: <span className={classes.priceText}>${art.price}</span>
        </h4>
        <div className={classes.buttonCtn}>
          <Button
            onClick={() => handleDelete(art.id)}
            variant="filled"
            color="yellow"
            size="xs"
            radius="xl"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
