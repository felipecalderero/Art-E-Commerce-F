import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//import Search from "../components/Search";
import axios from "axios";

const API_URL = "http://localhost:4000";

const AllPaintingsPage = () => {
  const [artworks, setArtworks] = useState([]);

  const getAllArtworks = () => {
    axios
      .get(`${API_URL}/arts`)
      .then((response) => setArtworks(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("getting art");
    getAllArtworks();
    console.log("art gotten...");
  }, []);

  return (
    <>
      <h1>All Paintings Page</h1>
      {console.log(artworks)}
      <div>
        <ul>
          {artworks &&
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
            })}
        </ul>
      </div>
    </>
  );
};

export default AllPaintingsPage;
