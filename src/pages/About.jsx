import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">LEAP Eligibility Tool</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Helping Virginia residents discover energy incentive programs and tax rebates through the Local Energy Alliance Program (LEAP).
        </p>
      </div>

      {/* Key Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <svg className="w-8 h-8 text-secondary mb-4" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
          </svg>
          <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
          <p className="text-gray-600">
            Navigate through Virginia's cities and counties with our interactive map interface to find location-specific energy programs.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <svg className="w-8 h-8 text-secondary mb-4" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
          </svg>
          <h3 className="text-xl font-semibold mb-2">Smart Results</h3>
          <p className="text-gray-600">
            Get customized recommendations based on your location and eligibility criteria, all processed locally in your browser.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <svg className="w-8 h-8 text-secondary mb-4" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
          </svg>
          <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
          <p className="text-gray-600">
            Your information stays in your browser. 
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <svg className="w-8 h-8 text-secondary mb-4" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor"/>
          </svg>
          <h3 className="text-xl font-semibold mb-2">Data Security</h3>
          <p className="text-gray-600">
            No data is collected or stored on our website.
          </p>
        </div>
        <br />
      </div>
      <p class="text-sm text-center">This web=app was made by members at <a href="https://madison.dssdglobal.org/" class="text-blue-600 hover:text-blue-800">Data Science for Sustainable Development (Madison Chapter)</a> in collaboration with the Local Energy Alliance Program (LEAP).</p>
      </div>
  );
};

export default AboutPage;