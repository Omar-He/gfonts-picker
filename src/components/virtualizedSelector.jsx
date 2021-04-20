import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";
import "../styles/fontSelector.scss";

import Select from "react-virtualized-select";
import React, { useState, useEffect } from "react";
import useGFonts from "../hooks/useGFonts";

const VirtualizedSelector = () => {
  const { filteredFonts, setViewedIndex, fontSearch } = useGFonts();
  const [lastIndex, setLastIndex] = useState();
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    const indexCalc = lastIndex - 20;
    const startIndex = lastIndex > 20 ? indexCalc : 0;
    setViewedIndex({ startIndex, stopIndex: lastIndex });
  }, [lastIndex]);

  const handleChange = (value) => {
    setSelectedValue(value);
  };
  return (
    <div>
      <Select
        value={selectedValue}
        style={{
          valueContainer: (provided, state) => {
            const fontFamily = selectedValue.family;

            return { ...provided, fontFamily };
          },
        }}
        options={filteredFonts}
        onChange={handleChange}
        onInputChange={(term) => fontSearch(term)}
        optionRenderer={({ option, style, selectValue, optionIndex }) => {
          setLastIndex(optionIndex);
          const font = filteredFonts[optionIndex];
          return (
            <div
              style={style}
              className="fp-option"
              onClick={() => selectValue(option)}
              key={optionIndex}
            >
              <span
                style={{
                  fontFamily: font.family,
                  fontSize: "24px",
                  margin: "3px",
                }}
              >
                {font.family}
              </span>
            </div>
          );
        }}
      />
    </div>
  );
};

export default VirtualizedSelector;
