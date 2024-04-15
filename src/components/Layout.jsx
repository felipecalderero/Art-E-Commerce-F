import { useLocation } from "react-router-dom";
import Header from "./Header";

const Layout = ({ children }) => {
  const location = useLocation();
  const ignoreRoute = ["/", "/register"];
  const shouldDisplayNavbar = ignoreRoute.indexOf(location.pathname) < 0;

  return (
    <div>
      {shouldDisplayNavbar && <Header />}
      {children}
    </div>
  );
};

export default Layout;
