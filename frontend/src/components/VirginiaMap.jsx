import React, { useState, useEffect, useRef } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import mapData from '../data/VA-optimized.json';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../layouts/Layout';

const VirginiaMap = () => {
    const [tooltip, setTooltip] = useState({ show: false, county: "", x: 0, y: 0 });
    const [width, setWidth] = useState(900);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const { setSearchQuery } = useSearch();

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                console.log(containerWidth);
                setWidth(Math.min(900, containerWidth - 32));
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const handleMouseMove = (event, countyName) => {
        setTooltip({
            show: true,
            county: countyName,
            x: event.clientX,
            y: event.clientY
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ show: false, county: "", x: 0, y: 0 });
    };

    const height = (width / 900) * 400;

    return (
        <div ref={containerRef} className="relative cursor-pointer w-full px-4">
            {tooltip.show && (
                <div
                    className="fixed bg-white px-4 py-2 rounded-lg shadow-lg transform -translate-x-1/2 z-10 pointer-events-none"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y - 48, // Reduced offset to be closer to cursor
                    }}
                >
                    <div className="text-sm font-medium">{tooltip.county}</div>
                    <div 
                        className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white"
                    />
                </div>
            )}
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: (width / 900) * 5500,
                    center: [-79.02, 37.98],
                }}
                width={width}
                height={height}
                className="cursor-pointer mx-auto"
            >
                <Geographies geography={mapData}>
                    {({geographies}) => (
                        geographies.map(geo => (
                            <Geography
                                key={geo.rsmKey}
                                onMouseMove={(event) => handleMouseMove(event, geo.properties.NAME)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => {
                                    setSearchQuery(geo.properties.NAME);
                                    navigate(`/q/county/${geo.properties.GEOID}`)
                                }}
                                geography={geo}
                                fill="#1e90ff"
                                stroke="lightgrey"
                                className="cursor-pointer"
                                style={{
                                    default: {
                                        outline: "none",
                                        transition: "all 0.3s",
                                        cursor: "pointer"
                                    },
                                    hover: {
                                        fill: "lightblue",
                                        outline: "none",
                                        cursor: "pointer"
                                    },
                                    pressed: {
                                        fill: "lightblue",
                                        outline: "none",
                                        cursor: "pointer"
                                    },
                                }}
                            />
                        ))
                    )}
                </Geographies>
            </ComposableMap>
        </div>
    );
};

export default VirginiaMap;