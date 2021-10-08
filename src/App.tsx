import { Suspense } from "react";

import { ToastContainer } from "react-toastify";

import PageSpinner from "components/PageSpinner";
import Router from "routes";

import Layout from "./layout";

const App = () => (
  <>
    <Suspense fallback={<PageSpinner />}>
      <Layout>
        <Router />
      </Layout>
    </Suspense>

    <ToastContainer position="bottom-left" />
  </>
);

export default App;
