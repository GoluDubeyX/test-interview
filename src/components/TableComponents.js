import React, { useState, useEffect } from "react";
import "./TableComponents.css";

const TableComponents = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilterData(data);
      });
  }, [page]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    setTimeout(() => {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilterData(filtered);
    }, 200);
  };

  const handleSort = () => {
    const sortedData = [...filterData].sort((a, b) => {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
    setFilterData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={handleSort} className="sortable-header">
              Title {sortOrder === "asc" ? "↓" : "↑"}
            </th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="pagination-button">
          Prev
        </button>
        <span className="page-info"> Page {page} </span>
        <button onClick={() => setPage(page + 1)} className="pagination-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponents;