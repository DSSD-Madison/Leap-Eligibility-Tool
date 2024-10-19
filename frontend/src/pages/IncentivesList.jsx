import React, { useEffect, useState } from 'react';
import '../../../Styles/IncentivesList.css';

const IncentivesList = () => {
  const [incentives, setIncentives] = useState([]);

  useEffect(() => {
    //fetch the JSON data
    fetch('../../incentives.json')
      .then((response) => response.json())
      .then((data) => setIncentives(data))
      .catch((error) => console.error('Error fetching incentives:', error));
  }, []);

  return (
    <div className="incentives-container p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Available Incentives</h1>
      <div className="grid grid-cols-1 gap-6">
        {incentives.map((incentive, index) => (
          <div key={index} className="card bg-base-100 shadow-lg p-4">
            <h2 className="text-xl font-semibold">{incentive.name}</h2>
            <p><strong>State:</strong> {incentive.state}</p>
            <p><strong>Category:</strong> {incentive.category}</p>
            <p><strong>Policy Type:</strong> {incentive.policyType}</p>
            <p><strong>Created:</strong> {incentive.created}</p>
            <p><strong>Last Updated:</strong> {incentive.lastUpdated}</p>
            <a href={incentive.link} className="link link-primary">More Info</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncentivesList;
