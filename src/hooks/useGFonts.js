import { useState, useEffect } from "react";
import { fetchFontsJSON } from "../helpers/fetchAllFonts";
import { webFontLoader } from "../helpers/webFontLoader";
import { removeUnnecessaryFonts } from "../helpers/fontsRemover";

export default function useGFonts() {
  const [apiKey, setApiKey] = useState("");
  const [allGoogleFonts, setAllGoogleFonts] = useState();
  const [filteredFonts, setFilteredFonts] = useState([]);
  const [viewedIndex, setViewedIndex] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!allGoogleFonts && apiKey) {
      getFonts();
    }

    if (viewedIndex && filteredFonts?.length > 0) {
      const { startIndex, stopIndex } = viewedIndex;
      const renderedFonts = filteredFonts.slice(startIndex, stopIndex + 1);
      removeUnnecessaryFonts(renderedFonts);
      if (renderedFonts.length > 0) {
        webFontLoader(renderedFonts);
      }
    }
  }, [viewedIndex, filteredFonts, apiKey]);

  useEffect(() => {
    const newFonts = allGoogleFonts?.filter(
      (font) => font.family.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
    searchTerm ? setFilteredFonts(newFonts) : setFilteredFonts(allGoogleFonts);
  }, [searchTerm]);

  const fontSearch = (value) => {
    setTimeout(() => {
      setSearchTerm(value);
    }, 100);
  };

  const getFonts = async () => {
    const gFonts = await fetchFontsJSON(apiKey);
    const newData = gFonts?.items?.map((font, key) => {
      return { ...font, label: font.family, value: key };
    });
    setFilteredFonts(newData || []);
    setAllGoogleFonts(newData || []);
  };

  return {
    filteredFonts,
    fontSearch,
    setViewedIndex,
    setApiKey,
  };
}
