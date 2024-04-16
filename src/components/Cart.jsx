import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CartItem from "./CartItem";
import classes from "../styles/Cart.module.css";
import { Button, Timeline, Text } from "@mantine/core";
import {
  IconGitBranch,
  IconGitPullRequest,
  IconGitCommit,
  IconMessageDots,
} from "@tabler/icons-react";

const Cart = () => {
  const { userId } = useParams();
  const [cartDetails, setCartDetails] = useState([]);
  const [fetching, setFetching] = useState(true);

  const getCart = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${userId}`)
      .then((response) => {
        const cartItems = response.data.cart;
        if (cartItems.length > 0) {
          return Promise.all(
            cartItems.map((artId) =>
              axios
                .get(`${import.meta.env.VITE_API_URL}/arts/${artId}`)
                .then((artResponse) => ({
                  artId,
                  ...artResponse.data,
                }))
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
        <h1>Your Cart: {userId}</h1>
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
          <Button variant="filled" color="gray" size="md" radius="xl">
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

      <div className={classes.timeline}>
        <Timeline color="gray" active={1} bulletSize={25} lineWidth={4}>
          <Timeline.Item title="Add to Cart">
            <Text c="dimmed" size="sm">
              Chose the art you want
            </Text>
            <Text size="xs" mt={4}>
              Done!
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Checkout">
            <Text c="dimmed" size="sm">
              Review and confirm
            </Text>
            <Text size="xs" mt={4}>
              In progress...
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Delivery" lineVariant="dashed">
            <Text c="dimmed" size="sm">
              Fill your address
            </Text>
            <Text size="xs" mt={4}>
              Pending{" "}
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Payment">
            <Text c="dimmed" size="sm">
              Introduce credit card{" "}
            </Text>
            <Text size="xs" mt={4}>
              Pending{" "}
            </Text>
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
};

export default Cart;
