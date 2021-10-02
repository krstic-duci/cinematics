import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { House, ClockHistory } from "react-bootstrap-icons";

import styles from "./Navigation.module.css";

const Navigation = () => (
  <Nav className="mt-2">
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
);

export default Navigation;
