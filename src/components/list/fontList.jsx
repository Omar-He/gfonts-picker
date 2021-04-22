import React, { useEffect } from "react";
import { List } from "react-virtualized";
import useGFonts from "../../hooks/useGFonts";
import "./fontList.scss";

function FontList({ apiKey, selectedFont }) {
  const { setApiKey, filteredFonts, fontSearch, setViewedIndex } = useGFonts();

  useEffect(() => {
    setApiKey(apiKey);
  }, [apiKey]);

  const onSelectFont = (font) => {
    selectedFont(font);
  };
  return (
    <div className="main-container">
      Hello Google fonts
      <div className="search-container">
        <input
          className="search-input"
          onChange={(e) => {
            fontSearch(e.target.value);
          }}
        />
      </div>
      <div className="list-container">
        {filteredFonts ? (
          <List
            className="virtual-list"
            width={600}
            height={600}
            rowHeight={100}
            rowCount={filteredFonts.length}
            rowRenderer={({ key, index, style, parent }) => {
              const font = filteredFonts[index];
              return (
                <div key={key} style={style}>
                  <span
                    onClick={() => onSelectFont(font)}
                    className="font-name"
                  >
                    {index + 1}- {font.family}
                  </span>
                  <div>
                    <span style={{ fontFamily: font.family, fontSize: "24px" }}>
                      Hello World !!
                    </span>
                  </div>
                </div>
              );
            }}
            onRowsRendered={({ startIndex, stopIndex }) => {
              setViewedIndex({ startIndex, stopIndex });
            }}
          />
        ) : (
          <span>Loading ...</span>
        )}
      </div>
    </div>
  );
}

export default FontList;
