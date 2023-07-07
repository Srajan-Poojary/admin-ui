import React, { useCallback } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";

function SearchBar({ onSearchTextChange, searchText }) {
  /**
   * This function is a callback that handles changes to the search text input.
   * It takes in an event object as an argument and calls the onSearchTextChange function with the value of the event target.
   */
  const handleSearchTextChange = useCallback(
    (e) => {
      onSearchTextChange(e.target.value);
    },
    [onSearchTextChange]
  );

  return (
    <div className="usertable-search-bar">
      <input
        className="user-input"
        type="text"
        value={searchText}
        onChange={handleSearchTextChange}
        placeholder="Search by name, email or role"
      />
    </div>
  );
}

SearchBar.propType = {
  searchText: PropTypes.string.isRequired,
};

export default SearchBar;
