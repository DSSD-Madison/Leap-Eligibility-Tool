import React, { useState, useRef, useEffect, Children } from "react";
import { Link } from "react-router-dom";
import mapData from "../data/VA-optimized.json";
import { useNavigate } from "react-router-dom";

const SearchContext = React.createContext();

export const useSearch = () => {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

const Layout = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const getCountyInfo = (topology) => {
    return topology.objects.tl_2024_us_county.geometries.map((geometry) => ({
      name: geometry.properties.NAME,
      geoid: geometry.properties.GEOID,
    }));
  };

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

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        isCountyValid,
        convertCountyIDToName,
      }}
    >
      <div className="flex flex-col justify-center items-center min-h-screen bg-base-100 text-lg">
        <div className="flex justify-between items-center w-almost_full m-almost_full">
          <Link to="/" className="flex">
            <img
              src="/images/leap_logo.png"
              alt="Leap Logo - Home"
              className="h-16 w-auto"
            />
          </Link>
          <div className="relative w-7/12" ref={dropdownRef}>
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
          <div className="flex justify-center items-center">
            <a
              href="https://leap-va.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-white"
            >
              Learn More about LEAP-VA
            </a>
            <Link to="/about" className="ml-4 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.25}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <main className="flex-grow w-almost_full mb-almost_full bg-bg_grey">
          {children}
        </main>
      </div>
    </SearchContext.Provider>
  );
};

export default Layout;
