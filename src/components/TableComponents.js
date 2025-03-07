import React, { useState, useEffect } from "react";
import "./TableComponents.css";

const TableComponents = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
        );
        const result = await response.json();
        setData(result);
        setFilterData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [page]);

  function handleSearch(event) {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);
    
    let filtered = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].title.toLowerCase().indexOf(value) !== -1) {
        filtered.push(data[i]);
      }
    }
    setFilterData(filtered);
  }

  // **🔹 खुद का Sorting Logic**
  function handleSort() {
    let sortedData = [...filterData];
    
    for (let i = 0; i < sortedData.length - 1; i++) {
      for (let j = i + 1; j < sortedData.length; j++) {
        if (
          (sortOrder === "asc" && sortedData[i].title > sortedData[j].title) ||
          (sortOrder === "desc" && sortedData[i].title < sortedData[j].title)
        ) {
          let temp = sortedData[i];
          sortedData[i] = sortedData[j];
          sortedData[j] = temp;
        }
      }
    }
    setFilterData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }

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
