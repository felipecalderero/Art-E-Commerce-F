// import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
//import Search from "../components/Search";
import axios from "axios";
import ArtsGrid from "../components/ArtsGrid";
import { UserContext } from "../context/user.context";
import { BreadcrumbContext } from "../context/breadcrumb.context";

const AllPaintingsPage = () => {
  const [artworks, setArtworks] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const { fetchUserDetails } = useContext(UserContext);
  const { setItemList } = useContext(BreadcrumbContext);

  const getAllArtworks = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/arts`)
      .then((response) => setArtworks(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllArtworks();
    fetchUserDetails(userId);
    setItemList([{ title: "All Painting" }]);
  }, []);

  return (
    <>
      <ArtsGrid list={artworks}></ArtsGrid>
    </>
  );
};

export default AllPaintingsPage;
