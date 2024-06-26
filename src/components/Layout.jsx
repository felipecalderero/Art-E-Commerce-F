import { useLocation } from "react-router-dom";
import Header from "./Header";
import AppBreadcrumbs from "./AppBreadcrumbs";
import { FooterCentered } from "./FooterCentered";

const Layout = ({ children }) => {
  const location = useLocation();
  const ignoreRoute = ["/", "/login", "/register", "/forgotpassword"];
  const shouldDisplayNavbar = ignoreRoute.indexOf(location.pathname) < 0;

  return (
    <>
      {shouldDisplayNavbar && (
        <>
          <Header />
          <AppBreadcrumbs />
        </>
      )}
      {children}
      <FooterCentered />
    </>
  );
};

export default Layout;
