import React, { useEffect, useState } from 'react';

const IncentivesList = () => {
  const [incentives, setIncentives] = useState([]);

  useEffect(() => {
    const fetchIncentives = async () => {
      const response = await fetch('/path/to/incentives.json');
      const data = await response.json();
      setIncentives(data);
    };

    fetchIncentives();
  }, []);

  return (
    <div>
      <h1>Available Incentives</h1>
      <ul>
        {incentives.map((incentive, index) => (
          <li key={index}>
            <h2>{incentive.name}</h2>
            <p>State: {incentive.state}</p>
            <p>Category: {incentive.category}</p>
            <p>Policy Type: {incentive.policyType}</p>
            <p>Created: {incentive.created}</p>
            <p>Last Updated: {incentive.lastUpdated}</p>
            <a href={incentive.link} target="_blank" rel="noopener noreferrer">More Info</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncentivesList;
