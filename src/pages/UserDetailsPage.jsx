import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:4000";

const UserDetailsPage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  const getUser = () => {
    axios
      .get(`${API_URL}/users/${userId}?_embed=arts`)
      .then((response) => {
        const currentUser = response.data;
        setUser(currentUser);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user ? (
        <>
          <h1>Artist: {user.username} </h1>
          <h2>Role: {user.role}</h2>
          <ul>
            {user.arts &&
              user.arts.map((currentArt, index) => (
                <li key={index}>
                  <Link to={"/arts/" + currentArt.id}>
                    <h3 key={index}>{currentArt.title}</h3>
                  </Link>
                </li>
              ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to All Paintings
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/artists");
            }}
          >
            Back to All Artists
          </button>
        </>
      ) : (
        <p>Loading user details...</p> // Provide a loading state feedback
      )}
    </>
  );
};

export default UserDetailsPage;
