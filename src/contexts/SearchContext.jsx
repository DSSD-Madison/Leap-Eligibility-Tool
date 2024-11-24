import React, { createContext, useContext, useState } from "react";
import mapData from "../data/VA-optimized.json";

const SearchContext = createContext();

  const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
      throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
  };

const SearchProvider = ({ children }) => {

  const isCountyValid = (countyID) => {
    try {
      const valid = mapData.objects.tl_2024_us_county.geometries
        .map((geometry) => geometry.properties.GEOID)
        .includes(countyID);
      return valid;
    } catch (error) {
      return false;
    }
  };

  const convertCountyIDToName = (countyID) => {
    if (!isCountyValid(countyID)) {
      return "";
    }
    const county = mapData.objects.tl_2024_us_county.geometries.find(
      (geometry) => geometry.properties.GEOID === countyID
    );
    return county.properties.NAME;
  };

  const [searchQuery, setSearchQuery] = useState("");

  const contextValue = {
    isCountyValid,
    convertCountyIDToName,
    setSearchQuery,
    searchQuery
  };

  return (
    <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>
  );
};

export { SearchProvider, useSearch };