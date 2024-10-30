import React from "react";
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps";
import mapData from '../assets/VA-optimized.json'; // Update the path if necessary
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
const VirginiaMap = () => {
    const [currentCounty, setCounty] = useState("");
    const navigate = useNavigate();
    console.log(mapData);
    return (
        <>
            <div className={"text-center font-bold text-2xl"}>
                <p>Current County being Hovered: {currentCounty}</p>
            </div>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 5500,    // Adjust scale to fit Virginia
                    //         x      y coordinates of the actual
                    center: [-79.02, 37.98],  // Centering on Virginia
                }}
                width={900}
                height={400}
            >
                    {/* Geographies expects a function as a child */}
                    <Geographies geography={mapData}>
                        {({geographies}) => (
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    onMouseEnter={() => setCounty(geo.properties.NAME)}
                                    onClick={() => navigate(`/q/county/${geo.properties.GEOID}`)}
                                    geography={geo}
                                    fill="#1E90FF"
                                    stroke="lightgrey"
                                    style={{
                                        hover: {fill: "lightblue", outline: "none"},
                                        pressed: {fill: "lightblue", outline: "none"},
                                    }}
                                />
                            ))
                        )}
                    </Geographies>
            </ComposableMap>
        </>
);
};

export default VirginiaMap;
