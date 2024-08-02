import React from "react";
import Select from "react-select";

const options = [
  { value: "Alphabets", label: "Alphabets" },
  { value: "Numbers", label: "Numbers" },
  { value: "Highest Alphabet", label: "Highest Alphabet" },
];
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: 14,
    color: "black",
    backgroundColor: "white", 
  }),
};

const DropDown = () => (
  <Select
    isMulti
    name="colors"
    options={options}
    styles={customStyles}
    className="basic-multi-select"
    classNamePrefix="select"
  />
);

export default DropDown;
