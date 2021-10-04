import Spinner from "react-bootstrap/Spinner";

import styles from "./PageSpinner.module.css";

const PageSpinner = () => (
  <div className={styles.pageSpinnerContainer}>
    <Spinner animation="border" />
  </div>
);

export default PageSpinner;
