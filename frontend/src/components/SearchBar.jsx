import { FaFilter } from "react-icons/fa";

function SearchBar({ search, setSearch, toggleFilter }) {
  return (
    <div className="search-wrapper">
      <input
        className="input search-input"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="filter-btn" onClick={toggleFilter}>
        <FaFilter className="filter-icon" />
      </button>
    </div>
  );
}

export default SearchBar;