import React from "react";
import styles from "./SearchBar.module.css"

const SearchBar = ({ setCurrentPage, setFilterState, filterState }) => {
  const handleInputChange = (event) => {
    event.preventDefault();
    setFilterState({ ...filterState, countrySearch: event.target.value });
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Buscar País..."
        onChange={(event) => handleInputChange(event)}
        className={styles.inputSearch}
      />
    </div>
  );
};

export default SearchBar;
