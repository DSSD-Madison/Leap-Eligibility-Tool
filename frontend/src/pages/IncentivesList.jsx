import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { decode, mapAnswersToIncentives } from '../tools/hash';

const IncentivesList = () => {
    const { encodedAnswers } = useParams();
    const [selectedIncentives, setSelectedIncentives] = useState([]);

    useEffect(() => {
        let decodedAnswers = [];
        if (encodedAnswers) {
            try {
                decodedAnswers = decode(encodedAnswers);
                const matchedIncentives = mapAnswersToIncentives(decodedAnswers);
                setSelectedIncentives(matchedIncentives);
            } catch (err) {
                console.error('Error decoding URL parameter:', err);
            }
        } else {
            const matchedIncentives = mapAnswersToIncentives(decodedAnswers);
            setSelectedIncentives(matchedIncentives);
        }
    }, [encodedAnswers]);

    const navigateToExternalLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold">Available Incentives</h1>
                {!encodedAnswers && (
                    <div role="alert" className="alert alert-warning mb-4 max-w-2xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <div>
                            <h3 className="font-bold">Only Showing Default Programs!</h3>
                            <div className="text-sm">To see incentives specific to your situation, search your county above</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
                {selectedIncentives.map((incentive, index) => (
                    <div key={index} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex flex-row items-center justify-between gap-2">
                                <h2 className="card-title font-bold truncate max-w-[75%]" title={incentive.name}>
                                    {incentive.name}
                                </h2>
                                <div className="badge badge-outline badge-secondary rounded-xl p-3 shrink-0">
                                    {incentive.category}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 mt-4">
                                <p>
                                    <span className="font-semibold">Policy Type:</span>{' '}
                                    {incentive.policyType}
                                </p>
                                <p>
                                    <span className="font-semibold">Last Updated:</span>{' '}
                                    {incentive.lastUpdated}
                                </p>
                            </div>
                            <div className="card-actions justify-start mt-4">
                                <button 
                                    className="btn btn-secondary text-white"
                                    onClick={() => navigateToExternalLink(incentive.link)}
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IncentivesList;