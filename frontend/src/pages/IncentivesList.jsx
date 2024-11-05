import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { decode, mapAnswersToIncentives } from '../tools/hash';

const IncentivesList = () => {
    const { id } = useParams();
    const [selectedIncentives, setSelectedIncentives] = useState([]);

    useEffect(() => {
        let decodedAnswers = [];
        if (id) {
            try {
                const decodedAnswers = decode(id);
            } catch (err) {
                console.error('Error decoding URL parameter:', err);
            }
        }
        else {
            const matchedIncentives = mapAnswersToIncentives(decodedAnswers);
            setSelectedIncentives(matchedIncentives);
        }
    }, [id]);

    const navigateToExternalLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="p-4">
            <div className = "flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold">Available Incentives</h1>
                {
                    !id && 
                    <div role="alert" class="alert alert-warning mb-4 max-w-2xl">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-sm"><strong>Only Showing Default Programs!</strong><br />To see incentives specific to your situation, search your county above</p>
                    </div>
                }
            </div>

            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
                {selectedIncentives.map((incentive, index) => (
                    <div key={index} className="bg-base-100 p-4">
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