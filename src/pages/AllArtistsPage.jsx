import { useState, useEffect, useContext } from "react";
//import Search from "../components/Search";
import axios from "axios";
import ArtistsGrid from "../components/ArtistsGrid";
import { Title } from "@mantine/core";
import { BreadcrumbContext } from "../context/breadcrumb.context";
import { UserContext } from "../context/user.context";
import classes from "../styles/AllArtistsPage.module.css";

const AllArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const { fetchUserDetails } = useContext(UserContext);
  const { setItemList } = useContext(BreadcrumbContext);

  // Fetch all artist details from DB
  const fetchAllArtists = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users?role=artist`)
      .then((response) => setArtists(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchAllArtists();
    fetchUserDetails(userId);
    setItemList([{ title: "All Artists" }]);
  }, []);

  return (
    <div className={classes.background}>
      <Title ta="center" className={classes.title}>
        Meet Our Artists{" "}
      </Title>
      <ArtistsGrid list={artists}></ArtistsGrid>
    </div>
  );
};

export default AllArtistsPage;
