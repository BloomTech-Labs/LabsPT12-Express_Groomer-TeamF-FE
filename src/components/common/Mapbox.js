import React, { useState, useEffect, createRef } from 'react';
import mapboxgl from 'mapbox-gl';

import { isDevelopment } from '../../utils/env';

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

  // Groomers (eventually will get from redux)
  const mapboxGroomers = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.034084142948, 38.909671288923],
        },
        properties: {
          id: '1',
          groomerId: 'ce68mjqz2by3t2peo6i4',
          businessName: 'Furry Friends Grooming & Care',
          address: '2081 Robin Stravenue Apt. 490',
          email: 'Lelia77@gmail.com',
          phoneNumber: '876-403-2046',
          lat: 5.5918,
          lng: -159.2544,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.049766, 38.900772],
        },
        properties: {
          id: '2',
          groomerId: 'bftqzfqkq3xzj953q64r',
          businessName: "Gillian's Fine Pet Grooming",
          address: '7857 Runte Court Suite 257',
          email: 'Adele77@hotmail.com',
          phoneNumber: '725-266-0638',
          lat: 13.4941,
          lng: 129.8933,
        },
      },
    ],
  };

  useEffect(() => {
    // Init mapbox
    const map = new mapboxgl.Map({
      container: $mapContainer.current,
      style: 'mapbox://styles/express-groomer/ckgio5w452keg19mofhut68o7', // stylesheet location
      center: [mapboxView.lng, mapboxView.lat], // starting position [lng, lat]
      zoom: mapboxView.zoom, // starting zoom
    });

    // Load groomer profiles onto map
    map.on('load', function(e) {
      /* Add the data to your map as a layer */
      map.addLayer({
        id: 'locations',
        type: 'symbol',
        /* Add a GeoJSON source containing place coordinates and information. */
        source: {
          type: 'geojson',
          data: mapboxGroomers,
        },
        layout: {
          'icon-image': 'veterinary-15',
          'icon-allow-overlap': true,
          'icon-size': 1.6,
        },
      });
    });

    // Mapbox move listener
    map.on('move', () => {
      if (isDevelopment) {
        // Update lat-long, zoom position
        setMapboxView({
          lat: map.getCenter().lng.toFixed(4),
          lng: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2),
        });
      }
    });
  }, []);

  return (
    <>
      <div className="mapbox">
        {isDevelopment && (
          <div className="sidebar">
            <div>
              Longitude: {mapboxView.lng} | Latitude: {mapboxView.lat} | Zoom:{' '}
              {mapboxView.zoom}
            </div>
          </div>
        )}
        <div ref={$mapContainer} className="map-container" />
      </div>
    </>
  );
};

export default Mapbox;
