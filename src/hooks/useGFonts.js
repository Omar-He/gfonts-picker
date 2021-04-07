import { useState, useEffect } from "react";
import { fetchFontsJSON } from "../helpers/fetchAllFonts";
import WebFont from "webfontloader";

export default function useGFonts() {
  const [allGoogleFonts, setAllGoogleFonts] = useState();
  const [filteredFonts, setFilteredFonts] = useState([]);
  const [viewedIndex, setViewedIndex] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!allGoogleFonts) {
      getFonts();
    }

    if (viewedIndex && filteredFonts.length > 0) {
      const { startIndex, stopIndex } = viewedIndex;
      const renderedFonts = filteredFonts.slice(startIndex, stopIndex + 1);
      document
        .querySelectorAll('style,link[rel="stylesheet"]')
        .forEach((item) => {
          const found = renderedFonts.find((font) => {
            const regex = new RegExp(font.family, "g");
            const fontToFind = item.href?.match(regex);
            if (fontToFind) return font.family === fontToFind[0];
            return null;
          });
          const googleFont = item.href?.match(/fonts.googleapis.com/g);
          if (!found && googleFont) item.remove();
        });
      if (renderedFonts.length > 0) {
        WebFont.load({
          classes: false,
          events: false,
          google: {
            families: renderedFonts?.map((i) => i.family),
          },
        });
      }
    }
  }, [viewedIndex]);

  useEffect(() => {
    const newFonts = allGoogleFonts?.filter(
      (font) => font.family.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
    console.log(newFonts);
    searchTerm ? setFilteredFonts(newFonts) : setFilteredFonts(allGoogleFonts);
  }, [searchTerm]);

  const getFonts = async () => {
    const gFonts = await fetchFontsJSON();
    setFilteredFonts(gFonts.items);
    setAllGoogleFonts(gFonts.items);
  };

  const fontSearch = (value) => {
    setTimeout(() => {
      setSearchTerm(value);
    }, 100);
  };

  return {
    filteredFonts,
    fontSearch,
    setViewedIndex,
  };
}