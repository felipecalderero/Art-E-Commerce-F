import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//import Search from "../components/Search";
import axios from "axios";

const API_URL = "http://localhost:4000";

const AllArtistsPage = () => {
  const [artists, setArtists] = useState([]);

  const getAllArtists = () => {
    axios
      .get(`${API_URL}/users?role=artist`)
      .then((response) => setArtists(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllArtists();
  }, []);

  return (
    <>
      <h1>All Artists Page</h1>
      <div>
        <ul>
          {artists ? (
            artists.map((currentArtist, i) => {
              return (
                <li key={i}>
                  <Link to={"/users/" + currentArtist.id}>
                    <h2>Name: {currentArtist.usename}</h2>
                  </Link>
                </li>
              );
            })
          ) : (
            <p>Loading Artists...</p> // Provide a loading state feedback
          )}
        </ul>
      </div>
    </>
  );
};

export default AllArtistsPage;
