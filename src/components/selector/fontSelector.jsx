import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";
import "./fontSelector.scss";
import Select from "react-virtualized-select";
import React, { useState, useEffect } from "react";
import useGFonts from "../../hooks/useGFonts";
import createClassNames from "classnames";
import removeUnnecessaryFonts from "../../helpers/fontsRemover";

const FontSelector = ({ apiKey, selectedFont, className }) => {
  const classes = createClassNames("FP-selector", className);
  const { setApiKey, filteredFonts, setViewedIndex, fontSearch } = useGFonts();
  const [stopIndex, setStopIndex] = useState();
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    setApiKey(apiKey);
  }, [apiKey]);

  useEffect(() => {
    const indexCalc = stopIndex - 20;
    const startIndex = stopIndex > 20 ? indexCalc : 0;
    setViewedIndex({ startIndex, stopIndex });
  }, [stopIndex]);

  const handleChange = (value) => {
    setSelectedValue(value);
    selectedFont(value);
    removeUnnecessaryFonts([value]);
  };
  return (
    <Select
      className={classes}
      value={selectedValue}
      styles={{
        selectValue: (provided, state) => ({
          fontFamily: selectedValue.family,
        }),
      }}
      options={filteredFonts}
      onChange={handleChange}
      onInputChange={(term) => fontSearch(term)}
      optionRenderer={({ option, style, selectValue, optionIndex }) => {
        setStopIndex(optionIndex);
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
                fontSize: "18px",
                margin: "3px",
              }}
            >
              {font.family}
            </span>
          </div>
        );
      }}
    />
  );
};

export default FontSelector;
