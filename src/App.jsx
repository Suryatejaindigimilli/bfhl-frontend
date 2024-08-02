import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [highestAlphabet, setHighestAlphabet] = useState("");
  const [filter, setFilter] = useState({
    numbers: true,
    highestAlphabet: true,
  });

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(input).data;
      const nums = data.filter((item) => !isNaN(item));
      const alphas = data.filter((item) => isNaN(item)).sort();
      const res = await axios.post("https://bfhl-backend-17fk.onrender.com/bfhl", {data});
      console.log(res.data)
      setNumbers(nums);
      setHighestAlphabet(alphas[alphas.length - 1] || "");
    } catch (e) {
      console.log(e)
      console.error("Invalid JSON input");
    }
  };

  const toggleFilter = (filterName) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [filterName]: !prevFilter[filterName],
    }));
  };
  

  return (
    <div className="container">
      <div className="input-section">
        <label htmlFor="api-input">API Input</label>
        <input
          type="text"
          id="api-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="filter-section">
        <label>Multi Filter</label>
        <div className="filters">
          <span className={`filter-chip ${filter.numbers ? "active" : ""}`}>
            Numbers
            <button
              className="close-button"
              onClick={() => toggleFilter("numbers")}
            >
              x
            </button>
          </span>
          <span
            className={`filter-chip ${filter.highestAlphabet ? "active" : ""}`}
          >
            Highest Alphabet
            <button
              className="close-button"
              onClick={() => toggleFilter("highestAlphabet")}
            >
              x
            </button>
          </span>
        </div>
      </div>

      <div className="response-section">
        <div>
          <strong>Filtered Response</strong>
        </div>
        {filter.numbers && <div>Numbers: {numbers.join(", ")}</div>}
        {filter.highestAlphabet && (
          <div>Highest Alphabet: {highestAlphabet}</div>
        )}
      </div>
    </div>
  );
};

export default App;
