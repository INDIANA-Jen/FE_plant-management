import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
    const [mapCenter, setMapCenter] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setMapCenter({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
                <GoogleMap
                    center={mapCenter}
                    zoom={12}
                // Other map configurations
                >
                    {/* Add map components, markers, etc. */}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MapContainer;