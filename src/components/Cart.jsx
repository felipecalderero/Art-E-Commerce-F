import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CartItem from "./CartItem";
import classes from "../styles/Cart.module.css";
import { Button } from "@mantine/core";

const Cart = () => {
  const { userId } = useParams();
  const [cartDetails, setCartDetails] = useState([]);
  const [fetching, setFetching] = useState(true);

  const navigate = useNavigate();

  const getCart = () => {
    console.log(userId);

    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${userId}`)
      .then((response) => {
        const cartItems = response.data.cart;
        if (cartItems.length > 0) {
          return Promise.all(
            cartItems.map((artId) =>
              axios
                .get(`${import.meta.env.VITE_API_URL}/arts/${artId}`)
                .then((artResponse) => {
                  return {
                    artId,
                    ...artResponse.data,
                  };
                })
            )
          );
        } else {
          return []; // Return an empty array to handle no cart items case
        }
      })
      .then((cartArtDetails) => {
        setCartDetails(cartArtDetails);
        setFetching(false);
      })
      .catch((error) => {
        console.error("Failed to fetch cart details:", error);
        setFetching(false);
      });
  };

  useEffect(() => {
    getCart();
  }, [userId]); // React to changes in userId if it can change during component's lifecycle

  function handleDelete(artId) {
    const filteredCartDetails = cartDetails.filter(
      (currentArt) => artId !== currentArt.artId
    );
    setCartDetails(filteredCartDetails);

    const filteredCart = [];
    filteredCartDetails.map((currentArt) => filteredCart.push(currentArt.id));
    console.log(filteredCart);

    axios
      .patch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        cart: filteredCart,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className={classes.root}>
      <div className={classes.cartList}>
        <h1>Your Cart:</h1>
        <Link to="/arts">
          <p>Continue shopping</p>
        </Link>
        {fetching ? (
          <p>Loading cart...</p>
        ) : (
          cartDetails.map((art, index) => (
            <CartItem key={index} art={art} handleDelete={handleDelete} />
          ))
        )}
        <div className={classes.totalCtn}>
          <Button
            variant="filled"
            color="gray"
            size="md"
            radius="xl"
            onClick={() => navigate(`/checkout/${userId}`)}
          >
            Checkout
          </Button>
          <div className={classes.textCtn}>
            <p>
              Total:{" "}
              <span className={classes.priceText}>
                $
                {cartDetails.reduce((acumulator, currentArt) => {
                  return (acumulator += currentArt.price);
                }, 0)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
