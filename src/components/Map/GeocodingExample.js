import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const initialCenter = {
    lat: 0,
    lng: 0,
};

const API_KEY = 'AIzaSyAguiylf_Y_iBBPafpUxiRWbtsdq8kDh6c';
function Map() {
    const [map, setMap] = useState(null);
    const [cities, setCities] = useState([]); // Store selected cities
    const [searchValue, setSearchValue] = useState('');

    const onLoad = (map) => {
        setMap(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAguiylf_Y_iBBPafpUxiRWbtsdq8kDh6c
        map`);
    };

    const onSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const onSearchSubmit = async () => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${searchValue}&key=${API_KEY}`
            );

            if (response.data.status === 'OK') {
                const location = response.data.results[0].geometry.location;

                setCities((prevCities) => [...prevCities, location]); // Add new city to the list
                setMap((prevMap) => {
                    if (prevMap) {
                        prevMap.panTo(location);
                    }
                    return prevMap;
                });
                console.log(location);
            }
        } catch (error) {
            console.error('Error fetching geocoding data:', error);
        }
    };

    return (
        <LoadScript googleMapsApiKey={API_KEY}>
            <div>
                <input
                    type="text"
                    placeholder="Search for a city"
                    value={searchValue}
                    onChange={onSearchChange}
                />
                <button onClick={onSearchSubmit}>Search</button>
            </div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={initialCenter}
                zoom={4}
                onLoad={onLoad}
            >
                {/* Render markers for selected cities */}
                {cities.map((city, index) => (
                    <Marker key={index} position={city} />
                ))}
            </GoogleMap>
        </LoadScript>
    );
}

export default Map;
