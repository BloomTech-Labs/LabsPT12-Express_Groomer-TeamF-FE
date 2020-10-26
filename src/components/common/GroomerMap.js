import React, { useState, useEffect, createRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { isDevelopment } from '../../utils/env';

// Set mapbox api key
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API || '';

/*
 * @prop array: groomers
 * @prop function: onGroomerSelect
 */
const GroomerMap = props => {
  // Mapbox element
  const $mapContainer = createRef();

  const [mapboxView, setMapboxView] = useState({
    lat: 39.0614,
    lng: -95.3221,
    zoom: 4.15,
  });

  // Currently selected Goomer on mapbox
  const [groomerSelected, setGroomerSelected] = useState({});

  // Groomers
  // use groomers props array to populate mapbox features layer
  const mapboxGroomers = {
    type: 'FeatureCollection',
    features: !props.groomers
      ? []
      : props.groomers.map(item => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [item.lat, item.lng],
            },
            properties: {
              ...item,
            },
          };
        }),
  };

  useEffect(() => {
    // Init mapbox
    const map = new mapboxgl.Map({
      container: $mapContainer.current,
      style: 'mapbox://styles/express-groomer/ckgio5w452keg19mofhut68o7', // stylesheet location
      center: [mapboxView.lng, mapboxView.lat], // starting position [lng, lat]
      zoom: mapboxView.zoom, // starting zoom
    });

    const flyToStore = currentFeature => {
      map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 13,
      });
    };

    const createPopUp = currentFeature => {
      const popUps = document.getElementsByClassName('mapboxgl-popup');
      /** Check if there is already a popup on the map and if so, remove it */
      if (popUps[0]) popUps[0].remove();

      const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(
          `
          <h3>
            Groomer
          </h3>
          <h4>
            ${currentFeature.properties.businessName}
          </h4>`
        )
        .addTo(map);
    };

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

    map.on('click', function(e) {
      /* Determine if a feature in the "locations" layer exists at that point. */
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['locations'],
      });

      /* If yes, then: */
      if (features.length) {
        const clickedPoint = features[0];

        /* Update selected groomer */
        setGroomerSelected(clickedPoint.properties);

        /* Fly to the point */
        flyToStore(clickedPoint);

        /* Close all other popups and display popup for clicked store */
        // createPopUp(clickedPoint);
      }
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

    function forwardGeocoder(query) {
      var matchingFeatures = [];
      for (var i = 0; i < mapboxGroomers.features.length; i++) {
        var feature = mapboxGroomers.features[i];
        // handle queries with different capitalization than the source data by calling toLowerCase()
        if (
          feature.properties.businessName
            .toLowerCase()
            .search(query.toLowerCase()) !== -1
        ) {
          // add a tree emoji as a prefix for custom data results
          // using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
          feature['place_name'] = '🔎 ' + feature.properties.businessName;
          feature['center'] = feature.geometry.coordinates;
          feature['place_type'] = ['veterinarian'];
          matchingFeatures.push(feature);
        }
      }
      return matchingFeatures;
    }

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      localGeocoder: forwardGeocoder,
      localGeocoderOnly: true,
      zoom: 13,
      placeholder: 'Search Groomers...',
      mapboxgl: mapboxgl,
    });

    map.addControl(geocoder, 'top-left');

    geocoder.on('result', function(ev) {
      /* Update selected groomer */
      setGroomerSelected(ev.result.properties);
    });
  }, []);

  useEffect(() => {
    // Pass groomer data into callback
    props.onGroomerSelect(groomerSelected);
  }, [groomerSelected]);

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

export default GroomerMap;
