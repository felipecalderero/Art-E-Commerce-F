import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Layout from "/src/components/Layout";
import AllPaintingsPage from "./pages/AllPaintingsPage";
import AllArtistsPage from "./pages/AllArtistsPage";
import PaintingDetailsPage from "./pages/PaintingDetailsPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

//import Navbar from "/src/components/Navbar.jsx";
//import Footer from "/src/components/Footer.jsx";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/arts" element={<AllPaintingsPage />} />
          <Route path="/artists" element={<AllArtistsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/arts/:artId" element={<PaintingDetailsPage />} />
          <Route path="/users/:userId" element={<UserDetailsPage />} />
          <Route path="/cart/:userId" element={<CartPage />} />
          <Route path="/checkout/:userId" element={<CheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
