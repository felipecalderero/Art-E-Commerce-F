import { useState } from "react";
import classes from "../styles/Navbar.module.css";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import user from "../assets/images/user.png";
import cart from "../assets/images/cart.png";
function Navbar() {
  const [active, setActive] = useState("paintings");

  return (
    <nav className={classes.container}>
      <div className={classes.leftNavbar}>
        <img src={logo} alt="Logo" className={classes.logo} />
        <div>
          <NavLink
            to="/"
            className={`${classes.navlink} ${
              active === "paintings" ? classes.active : ""
            }`}
            onClick={() => setActive("paintings")}
          >
            Paintings
          </NavLink>
          <NavLink
            to="/artists"
            className={`${classes.navlink} ${
              active === "artists" ? classes.active : ""
            }`}
            onClick={() => setActive("artists")}
          >
            Artists
          </NavLink>
        </div>
      </div>
      <div className={classes.rightNavbar}>
        <img src={user} alt="User" className={classes.user} />
        <img src={cart} alt="Cart" className={classes.cart} />
      </div>
    </nav>
  );
}

export default Navbar;
