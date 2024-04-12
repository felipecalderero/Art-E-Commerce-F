import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import AllPaintingsPage from "./pages/AllPaintingsPage";
import AboutPage from "./pages/AboutPage";
//import Navbar from "/src/components/Navbar.jsx";
//import Footer from "/src/components/Footer.jsx";

function App() {
  return (
    <div className="App">
      <h1>Art E-Commerce</h1>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<AllPaintingsPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* <Route path="/arts/:artId" element={<PaintingsDetailsPage />} />
  <Route path="/users/:userId" element={<ArtistDetailsPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
