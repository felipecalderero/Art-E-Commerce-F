import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Paintings from "./pages/Paintings";
import Artists from "./pages/Artists";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Paintings />}></Route>
        <Route path="/artists" element={<Artists />}></Route>
      </Routes>
    </>
  );
}

export default App;
