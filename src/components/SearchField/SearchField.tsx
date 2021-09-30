import React, { useState } from "react";

import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

const SearchField = () => {
  const [query, setQuery] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form>
      <InputGroup>
        <FormControl
          placeholder="Search you movie here"
          onChange={onInputChange}
        />
      </InputGroup>
      {query ? query : "empty"}
    </form>
  );
};

export default SearchField;
