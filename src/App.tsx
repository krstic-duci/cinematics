import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { ToastContainer } from "react-toastify";

import Header from "components/Header";
import Movies from "components/Movies";

const App = () => {
  return (
    <>
      <Container>
        <Row>
          <Header />
          <Movies />
        </Row>
      </Container>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
