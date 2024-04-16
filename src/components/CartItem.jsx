import classes from "../styles/AuthenticationTitle.module.css";

const CartItem = ({ art, handleDelete }) => {
  return (
    <div className={classes.carCtn}>
      <img src={art.image} style={{ width: "100px" }} />
      <div className={classes.textCtn}>
        <h1>{art.title}</h1>
        <h2>{art.userId}</h2>
        <h3>{art.size}</h3>
        <button type="button" onClick={() => handleDelete(art.id)}>
          Remove from Cart
        </button>
      </div>
    </div>
  );
};

export default CartItem;
