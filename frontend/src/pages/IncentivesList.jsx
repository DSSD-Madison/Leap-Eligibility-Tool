import React, {useEffect, useState} from 'react';

const IncentivesList = () => {
    const [incentives, setIncentives] = useState([]);

    useEffect(() => {
        //fetch the JSON data
        fetch('../../incentives.json')
            .then((response) => response.json())
            .then((data) => setIncentives(data))
            .catch((error) => console.error('Error fetching incentives:', error));
    }, []);

    const navigateToExternalLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold mb-6">Available Incentives</h1>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
                {incentives.map((incentive, index) => (
                    <div key={index} className="card bg-base-100 shadow-lg p-4">
                        <div className={"flex flex-row items-center justify-between mb-2"}>
                            <h2 className="card-title font-bold">{incentive.name}</h2>
                            <div className="badge badge-outline rounded-xl ml-2 p-3 min-w-fit">{incentive.category}</div>
                        </div>
                        <div className={"flex flex-col max-sm:grid-cols-1 gap-2"}>
                            <p><strong>Policy Type:</strong> {incentive.policyType}</p>
                            <p><strong>Last Updated:</strong> {incentive.lastUpdated}</p>
                        </div>
                        <button className="btn btn-secondary text-white w-fit mt-5"
                                onClick={() => navigateToExternalLink(incentive.link)}>Learn More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IncentivesList;
