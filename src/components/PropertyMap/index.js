import React, { useRef, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';

const PropertyMap = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (latitude && longitude && mapRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM({
              // Remove the attribution
              attributions: []
            })
          })
        ],
        view: new View({
          center: fromLonLat([longitude, latitude]),
          zoom: 16
        })
      });

      const markerFeature = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude]))
      });

      const markerStyle = new Style({
        image: new Icon({
          src: 'https://cdn.mapmarker.io/api/v1/pin?size=50&background=%23FF0000&text=%20&icon=fa-map-marker-alt%20fa-2x&hoffset=1',
        })
      });

      markerFeature.setStyle(markerStyle);
      map.addLayer(new VectorLayer({
        source: new VectorSource({
          features: [markerFeature]
        })
      }));
    }
  }, [latitude, longitude]);

  return latitude && longitude ? <div ref={mapRef} style={{ height: '400px', width: '100%' }} /> : null;
};

export default PropertyMap;