import React from "react";

import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";

import styles from "./SearchField.module.css";

// TODO: Check if we are gonna need lodash-es
// https://www.npmjs.com/package/react-debounce-input

interface SearchFieldProps {
  query: string;
  setQuery: (value: string) => void;
}

const SearchField: React.VFC<SearchFieldProps> = ({ query, setQuery }) => {
  const handleMovieSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClearMovieSearch = () => {
    setQuery("");
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <InputGroup>
        <FormControl
          placeholder="Start typing..."
          aria-placeholder="Start typing..."
          onChange={handleMovieSearch}
          value={query}
        />
        <Button onClick={handleClearMovieSearch} className={styles.clear}>
          Clear
        </Button>
      </InputGroup>
    </form>
  );
};

export default SearchField;
