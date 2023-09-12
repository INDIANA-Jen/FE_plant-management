import React, { useState, useEffect } from 'react';

function GeocodeCoordinates(lat, long) {
  const [address, setAddress] = useState('');

  useEffect(() => {

    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK' && data.results.length > 0) {
          const formattedAddress = data.results[0].formatted_address;
          setAddress(formattedAddress);
        } else {
          setAddress('Adresse introuvable');
        }
      })
      .catch((error) => {
        console.error('Error fetching address:', error);
        setAddress('Adresse introuvable');
      });
  }, [lat, long]);

  return address
}

export default GeocodeCoordinates;