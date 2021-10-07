import React from "react";

import styles from "./Title.module.css";

interface TitleProps {
  label: string;
}

const Title: React.VFC<TitleProps> = ({ label }) => (
  <h1 className={`${styles.title} my-4`}>{label}</h1>
);

export default Title;
