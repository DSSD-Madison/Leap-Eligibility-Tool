import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mapData from "../data/VA-optimized.json";
import { useSearch } from "../contexts/SearchContext";
import MediaQuery from "../tools/mediaQuery";

const SearchBar = ({isHomePage}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {setSearchQuery, searchQuery} = useSearch();
  const navigate = useNavigate();
  
  const getCountyInfo = (topology) => {
    return topology.objects.tl_2024_us_county.geometries.map((geometry) => ({
      name: geometry.properties.NAME,
      geoid: geometry.properties.GEOID,
    }));
  };

  const counties = getCountyInfo(mapData);

  const filteredCounties = counties.filter((county) =>
    county.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountySelect = (county) => {
    setSearchQuery(county.name);
    setIsDropdownOpen(false);
    navigate(`/q/county/${county.geoid}`);
  };

  const searchBarWidth = isHomePage ? 'w-almost_full' : 'w-7/12';

  return (
    <div className={`relative ${searchBarWidth}`} ref={dropdownRef}>
      <label className="input input-bordered flex items-center gap-2 w-full rounded-2xl bg-bg_grey border-none p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-8 w-8 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          name="query"
          className="grow outline-none bg-transparent"
          placeholder="Search by county..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
        />
      </label>
      {isDropdownOpen && searchQuery && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {filteredCounties.map((county) => (
            <div
              key={county.geoid}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleCountySelect(county)}
            >
              {county.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;