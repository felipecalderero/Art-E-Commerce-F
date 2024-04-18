import { useState, useEffect, useContext } from "react";
//import Search from "../components/Search";
import axios from "axios";
import ArtistsGrid from "../components/ArtistsGrid";
import { Title } from "@mantine/core";
import { BreadcrumbContext } from "../context/breadcrumb.context";
import { UserContext } from "../context/user.context";

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
    <>
      <Title order={2} ta="center" mt={50}>
        MEET OUR ARTISTS
      </Title>
      <ArtistsGrid list={artists}></ArtistsGrid>
    </>
  );
};

export default AllArtistsPage;
