import Container from "react-bootstrap/Container";

import Header from "components/Header";
import MoviesLists from "components/MoviesLists";

const App = () => {
  return (
    <Container>
      <Header />
      <MoviesLists />
    </Container>
  );
};

export default App;
