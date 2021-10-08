import { House, ClockHistory } from "react-bootstrap-icons";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

import tmdb from "assets/images/tmdb.svg";

import styles from "./Header.module.css";

const Header = () => (
  <header>
    <Nav className="mt-2 align-items-center">
      <Nav.Item className={styles.navItem}>
        <NavLink exact to="/">
          <House />
          Home
        </NavLink>
      </Nav.Item>

      <Nav.Item className={styles.navItem}>
        <NavLink to="/watch-later">
          <ClockHistory />
          Watch Later
        </NavLink>
      </Nav.Item>
    </Nav>
    <div className="d-flex align-items-center">
      <p className="mb-0">Made with:</p>
      <img src={tmdb} alt="tmdb" width="100px" className="ms-2" />
    </div>
  </header>
);

export default Header;
