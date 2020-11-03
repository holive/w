import React from 'react';

const GooglePlaces = () => {
  const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_SECRET}&libraries=places`;
  return <script async defer src={url}></script>;
};

export default GooglePlaces;
