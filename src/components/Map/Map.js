import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        // Initialize the map when the component mounts
        mapRef.current = L.map('map', {
            center: [51.505, -0.09], // Initial map center
            zoom: 13, // Initial zoom level
        });

        // Add a tile layer (you can replace this with your desired map provider)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapRef.current);
    }, []);

    return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
