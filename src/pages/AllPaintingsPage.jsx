// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//import Search from "../components/Search";
import axios from "axios";
import AppGrid from "../components/AppGrid";

const API_URL = "http://localhost:4000";

const AllPaintingsPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  const getAllArtworks = () => {
    axios
      .get(`${API_URL}/arts`)
      .then((response) => setArtworks(response.data))
      .catch((error) => console.log(error));
  };

  const fetchUserDetails = async () => {
    try {
      const userData = await axios.get(`${API_URL}/users/${userId}`);
      if (userData.status === 200) {
        setUserDetails(userData.data);
      } else {
        throw new Error("Error while fetching user details " + userData);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const updateUserCart = async (artId, isRemove) => {
    try {
      if (isRemove) {
        userDetails.cart.splice(userDetails.cart.indexOf(artId), 1);
      } else {
        userDetails.cart.push(artId);
      }
      const payload = {
        cart: userDetails.cart,
      };
      console.log("payload ", payload);
      const updateUser = await axios.patch(
        `${API_URL}/users/${userId}`,
        payload
      );
      if (updateUser.status === 200) {
        console.log("Item added to the cart");
        await fetchUserDetails();
      } else {
        throw new Error("Error while adding item to the cart " + updateUser);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getAllArtworks();
    fetchUserDetails();
  }, []);

  return (
    <>
      <AppGrid
        list={artworks}
        updateUserCart={updateUserCart}
        userCart={userDetails.cart}
      ></AppGrid>
    </>
  );
};

export default AllPaintingsPage;
