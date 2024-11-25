import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { decode, mapAnswersToIncentives } from '../tools/hash';

const IncentivesList = () => {
    const { encodedAnswers } = useParams();
    const [selectedIncentives, setSelectedIncentives] = useState([]);
    const [colorMaps, setColorMaps] = useState({
        policyTypes: new Map(),
        categories: new Map()
    });

    // Separate color palettes for policy types and categories
    const policyTypeColors  = [
        'bg-blue-50',
        'bg-indigo-50',
        'bg-violet-50',
        'bg-purple-50',
        'bg-fuchsia-50',
        'bg-sky-50',
        'bg-cyan-50',
        'bg-blue-100',
    ];

    const categoryColors = [
        'bg-rose-50',
        'bg-orange-50',
        'bg-amber-50',
        'bg-yellow-50',
        'bg-lime-50',
        'bg-green-50',
        'bg-emerald-50',
        'bg-teal-50',
    ];

    useEffect(() => {
        let decodedAnswers = [];
        if (encodedAnswers) {
            try {
                decodedAnswers = decode(encodedAnswers);
            } catch (err) {
                console.error('Error decoding URL parameter:', err);
            }
        } 
        const matchedIncentives = mapAnswersToIncentives(decodedAnswers);
        setSelectedIncentives(matchedIncentives);

        // Generate color maps for policy types and categories
        const newColorMaps = {
            policyTypes: new Map(),
            categories: new Map()
        };

        // Get unique policy types and categories
        const uniquePolicyTypes = [...new Set(matchedIncentives.map(i => i.policyType))];
        const uniqueCategories = [...new Set(matchedIncentives.map(i => i.category))];

        // Assign colors to policy types from the blue/purple palette
        uniquePolicyTypes.forEach((type, index) => {
            newColorMaps.policyTypes.set(type, policyTypeColors[index % policyTypeColors.length]);
        });

        // Assign colors to categories from the warm/green palette
        uniqueCategories.forEach((category, index) => {
            newColorMaps.categories.set(category, categoryColors[index % categoryColors.length]);
        });

        setColorMaps(newColorMaps);
    }, [encodedAnswers]);

    const navigateToExternalLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="w-full p-4">
            <h1 className="text-2xl font-bold mb-6">Available Incentives</h1>
            
            {!encodedAnswers && (
                <div role="alert" className="alert alert-warning mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Complete the assessment to see incentives specific to your situation</span>
                </div>
            )}

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="font-bold p-4">Program Name</th>
                            <th className="font-bold p-4">Category</th>
                            <th className="font-bold p-4">Policy Type</th>
                            <th className="font-bold p-4">Last Updated</th>
                            <th className="font-bold p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedIncentives.map((incentive, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-4 font-medium">{incentive.name}</td>
                                <td className={`p-4 ${colorMaps.categories.get(incentive.category)}`}>
                                    {incentive.category}
                                </td>
                                <td className={`p-4 ${colorMaps.policyTypes.get(incentive.policyType)}`}>
                                    {incentive.policyType}
                                </td>
                                <td className="p-4">{incentive.lastUpdated}</td>
                                <td className="p-4 text-center">
                                    <button 
                                        onClick={() => navigateToExternalLink(incentive.link)}
                                        className="btn btn-secondary btn-sm text-white"
                                    >
                                       {
                                            incentive.btn_text || 'Learn More'
                                       }
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedIncentives.length === 0 && (
                    <div className="text-center p-8 bg-white">
                        <h3 className="font-medium text-lg">No Incentives Found</h3>
                        <p className="text-gray-600 mt-2">Try adjusting your search criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IncentivesList;