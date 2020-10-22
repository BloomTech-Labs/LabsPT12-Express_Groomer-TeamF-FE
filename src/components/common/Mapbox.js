import React, { useState, useEffect, createRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { isDevelopment } from '../../utils/env';
import { log } from '../../utils/log';

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

  // Currently selected Goomer on mapbox
  const [groomerSelected, setGroomerSelected] = useState({});

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

    const flyToStore = currentFeature => {
      map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 12,
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
      zoom: 12,
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
    log(groomerSelected);
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

export default Mapbox;
