import React, { useEffect, useState } from 'react';
import '../../../Styles/IncentivesList.css'; 

const IncentivesList = () => {
  const [incentives, setIncentives] = useState([]);

  useEffect(() => {
    // Fetch the JSON data
    fetch('../../incentives.json')
      .then((response) => response.json())
      .then((data) => setIncentives(data))
      .catch((error) => console.error('Error fetching incentives:', error));
  }, []);

  return (
    <div className="incentives-container">
      <h1 className="title">Available Incentives</h1>
      <div className="incentives-list">
        {incentives.map((incentive, index) => (
          <div key={index} className="incentive-card">
            <h2 className="incentive-name">{incentive.name}</h2>
            <p><strong>State:</strong> {incentive.state}</p>
            <p><strong>Category:</strong> {incentive.category}</p>
            <p><strong>Policy Type:</strong> {incentive.policyType}</p>
            <p><strong>Created:</strong> {incentive.created}</p>
            <p><strong>Last Updated:</strong> {incentive.lastUpdated}</p>
            <a href={incentive.link} className="incentive-link">More Info</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncentivesList;
