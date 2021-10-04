import { ToastContainer } from "react-toastify";

import Layout from "./layout";
import Router from "routes";

// TODO: Please add eslint-plugin-import, prettier, eslint
const App = () => {
  return (
    <>
      <Layout>
        <Router />
      </Layout>
      <ToastContainer position="bottom-left" />
    </>
  );
};

export default App;
