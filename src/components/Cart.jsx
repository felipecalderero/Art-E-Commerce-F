import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CartItem from "./CartItem";

const API_URL = "http://localhost:4000";

const Cart = () => {
  const { userId } = useParams();
  const [cartDetails, setCartDetails] = useState([]);
  const [fetching, setFetching] = useState(true);

  const getCart = () => {
    axios
      .get(`${API_URL}/users/${userId}`)
      .then((response) => {
        const cartItems = response.data.cart;
        if (cartItems.length > 0) {
          return Promise.all(
            cartItems.map((artId) =>
              axios.get(`${API_URL}/arts/${artId}`).then((artResponse) => ({
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
      .patch(`${API_URL}/users/${userId}`, {
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
    <>
      <h1>Cart Page {userId}</h1>
      {fetching ? (
        <p>Loading cart...</p>
      ) : (
        cartDetails.map((art, index) => (
          <CartItem key={index} art={art} handleDelete={handleDelete} />
        ))
      )}
    </>
  );
};

export default Cart;
