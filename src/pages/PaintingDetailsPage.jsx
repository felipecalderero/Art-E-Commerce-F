import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

const API_URL = "http://localhost:4000";

const PaintingDetailsPage = () => {
  const [art, setArt] = useState(null);
  const { artId } = useParams();

  const navigate = useNavigate();

  const getArt = () => {
    axios
      .get(`${API_URL}/arts/${artId}`)
      .then((response) => {
        const currentArt = response.data;
        setArt(currentArt);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getArt();
  }, []);

  return (
    <>
      {art ? (
        <>
          <h1>Title: {art.title}</h1>
          <Link to={"/users/" + art.userId}>
            <h3>Artist: {art.userId}</h3>
          </Link>
          <h3>Category: {art.category}</h3>
          <h4>Date: {art.date}</h4>
          <h5>Size: {art.size}</h5>
          <p>{art.description}</p>
          <img src={art.image} style={{ height: "6rem" }} alt={art.title} />
          <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to All Paintings
          </button>
        </>
      ) : (
        <p>Loading painting details...</p> // Provide a loading state feedback
      )}
    </>
  );
};

export default PaintingDetailsPage;
