// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//import Search from "../components/Search";
import axios from "axios";
import AppGrid from "../components/AppGrid";

const API_URL = "http://localhost:4000";

const AllPaintingsPage = () => {
  const [artworks, setArtworks] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  let userCart = [];

  const getAllArtworks = () => {
    axios
      .get(`${API_URL}/arts`)
      .then((response) => setArtworks(response.data))
      .catch((error) => console.log(error));
  };

  const updateUserCart = (artId) => {
    userCart = [...userCart, artId];
    axios
      .get(`${API_URL}/users/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          axios
            .patch(`${API_URL}/users/${userId}`, {
              cart: [...response.data.cart, artId],
            })
            .then((response) => {
              if (response.status === 200) {
                console.log("Item added to the cart");
              } else {
                console.log("Error while adding item to the cart,", response);
              }
            })
            .catch((error) =>
              console.log("Error while adding item to the cart,", error)
            );
        } else {
          console.log("Error while fetching user detail", response);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllArtworks();
  }, []);

  return (
    <>
      <AppGrid list={artworks} updateUserCart={updateUserCart}></AppGrid>

      {/* <div>
        <ul>
          {artworks ? (
            artworks.map((art, i) => {
              return (
                <li key={i}>
                  <Link to={"/arts/" + art.id}>
                    <h2>Title: {art.title}</h2>
                  </Link>
                  <Link to={"/users/" + art.userId}>
                    <h3>Artist: {art.userId}</h3>
                  </Link>
                  <h3>Category: {art.category}</h3>
                  <h4>Date: {art.date}</h4>
                  <h5>Size: {art.size}</h5>
                  <p>{art.description}</p>
                  <img
                    src={art.image}
                    style={{ height: "6rem" }}
                    alt={art.title}
                  />
                </li>
              );
            })
          ) : (
            <p>Loading Paintings...</p> // Provide a loading state feedback
          )}
        </ul>
      </div> */}
    </>
  );
};

export default AllPaintingsPage;
