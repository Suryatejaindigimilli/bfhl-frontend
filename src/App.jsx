// import React, { useState } from "react";
// import Select from "react-select";
// import axios from "axios";
// import DropDown from "./components/DropDown";

// function App() {
//   const [input, setInput] = useState("");
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState("");

//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const options = [
//     { value: "Alphabets", label: "Alphabets" },
//     { value: "Numbers", label: "Numbers" },
//     { value: "Highest Alphabet", label: "Highest Alphabet" },
//   ];
//   const customStyles = {
//     option: (provided, state) => ({
//       ...provided,
//       fontSize: 14,
//       color: "black",
//       backgroundColor: "white", // Change background color for selected options
//     }),
//   };

//   const handleChange = (options) => {
//     setSelectedOptions(options);
//   };

//   const handleSubmit = async () => {
//     try {
//       console.log(selectedOptions);
//       const parsedInput = JSON.parse(input);
//       const res = await axios.post("http://localhost:3000/bfhl", parsedInput); // Replace with actual URL
//       setResponse(res.data);
//       setError("");
//     } catch (e) {
//       console.log(e);
//       setError("Invalid JSON or error with API call");
//     }
//   };

//   return (
//     <div>
//       <h1>Your Roll Number</h1>
//       <textarea
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Enter JSON here"
//       />
//       <button onClick={handleSubmit}>Submit</button>
//       <Select
//         isMulti
//         name="colors"
//         options={options}
//         styles={customStyles}
//         className="basic-multi-select"
//         classNamePrefix="select"
//         onChange={handleChange}
//       />
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {response && <div>{JSON.stringify(response, null, 2)}</div>}
//     </div>
//   );
// }

// export default App;

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
      const res = await axios.post("http://localhost:3000/bfhl", {data});
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
