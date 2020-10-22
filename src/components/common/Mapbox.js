import React, { useState, useEffect, createRef } from 'react';
import mapboxgl from 'mapbox-gl';

// Set mapbox api key
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API || '';

const Mapbox = () => {
  // Mapbox element
  const $mapContainer = createRef();

  const [mapboxView, setMapboxView] = useState({
    lat: 38.8891,
    lng: -76.9833,
    zoom: 10.3,
  });

  useEffect(() => {
    // Init mapbox
    const map = new mapboxgl.Map({
      container: $mapContainer.current,
      style: 'mapbox://styles/express-groomer/ckgio5w452keg19mofhut68o7', // stylesheet location
      center: [mapboxView.lng, mapboxView.lat], // starting position [lng, lat]
      zoom: mapboxView.zoom, // starting zoom
    });
  }, []);

  return (
    <>
      <div className="mapbox">
        <div ref={$mapContainer} className="map-container" />
      </div>
    </>
  );
};

export default Mapbox;
