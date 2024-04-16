import { useState, useEffect, useContext } from "react";
//import Search from "../components/Search";
import axios from "axios";
import ArtistsGrid from "../components/ArtistsGrid";
import { Title } from "@mantine/core";
import { BreadcrumbContext } from "../context/breadcrumb.context";

const AllArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const { setItemList } = useContext(BreadcrumbContext);

  const getAllArtists = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users?role=artist`)
      .then((response) => setArtists(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllArtists();
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
