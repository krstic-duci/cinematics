import tmdb from "assets/images/tmdb.svg";

const Header = () => {
  return (
    <header className="d-flex align-items-center justify-content-between mb-4">
      <h1 className="mb-0">Cinematics</h1>
      <img src={tmdb} alt="tmdb" width="100px" height="100px" />
    </header>
  );
};

export default Header;
