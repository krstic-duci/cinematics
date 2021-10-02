import Navigation from "components/Navigation";

import tmdb from "assets/images/tmdb.svg";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header>
        <Navigation />

        <div className="d-flex align-items-center justify-content-between">
          <h1 className={`${styles.h1} mb-0`}>Cinematics</h1>
          <img src={tmdb} alt="tmdb" width="100px" height="100px" />
        </div>
      </header>
    </>
  );
};

export default Header;
