import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import Crwn from "../../assets/007-crown.svg";
import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={Crwn} alt="" className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link to="/shop" className="nav-link">
            SHOP
          </Link>
          <Link to="/auth" className="nav-link">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet></Outlet>
    </Fragment>
  );
};

export default Navigation;
