import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";
import "./fontSelector.scss";
import Select from "react-virtualized-select";
import React, { useState, useEffect } from "react";
import useGFonts from "../../hooks/useGFonts";
import createClassNames from "classnames";
import { removeAllFonts } from "../../helpers/fontsRemover";

const FontSelector = ({ apiKey, selectedFont, className, defaultFont }) => {
  const classes = createClassNames("FP-selector", className);
  const { setApiKey, filteredFonts, setViewedIndex, fontSearch } = useGFonts();
  const [stopIndex, setStopIndex] = useState();
  const [selectedValue, setSelectedValue] = useState({ label: defaultFont });

  useEffect(() => {
    setApiKey(apiKey);
  }, [apiKey]);

  useEffect(() => {
    if (!stopIndex) {
      setViewedIndex({ startIndex: 0, stopIndex: 15 });
      return;
    }
    const indexCalc = stopIndex - 20;
    const startIndex = stopIndex > 20 ? indexCalc : 0;
    setViewedIndex({ startIndex, stopIndex });
  }, [stopIndex]);

  const handleChange = (value) => {
    setSelectedValue(value);
    selectedFont(value);
    removeAllFonts();
    setStopIndex(1);
  };

  return (
    <Select
      clearable={false}
      className={classes}
      value={selectedValue}
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
