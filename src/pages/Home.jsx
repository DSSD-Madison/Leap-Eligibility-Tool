import React from "react";
import VirginiaMap from "../components/VirginiaMap.jsx";
import MediaQuery from "../tools/mediaQuery";
import SearchBar from "../components/SearchBar.jsx";

const Home = () => {
  if (MediaQuery.isNotDesktop()) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen bg-base-100 px-4">
        <div className="w-full max-w-lg mt-8 space-y-6">
          {/* Logo centered on mobile */}
          <div className="flex justify-center mb-8">
            <img
              src="/images/leap_logo.png"
              alt="Leap Logo"
              className="h-24 w-auto"
            />
          </div>
          
          {/* Welcome text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome to LEAP Virginia's Eligibility Tool
            </h1>
            <p className="text-gray-600">
              Search for your county to explore available services
            </p>
          </div>
          
          {/* Search bar */}
          <SearchBar isHomePage={true} />
          
          {/* Additional info or call to action */}
          <div className="text-center mt-8">
            <a
              href="https://leap-va.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary-focus transition-colors"
            >
              Learn more about our services →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <VirginiaMap />
  );
};

export default Home;