import { useLocation } from "react-router-dom";
import Header from "./Header";

const Layout = ({ children }) => {
  const location = useLocation();
  console.log(location);
  const shouldDisplayNavbar = location.pathname !== "/";

  return (
    <div>
      {shouldDisplayNavbar && <Header />}
      {children}
    </div>
  );
};

export default Layout;
