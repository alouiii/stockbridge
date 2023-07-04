import React, { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngExpression } from 'leaflet';
import markerIcon from '../../assets/marker.svg';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { PopulatedAdvert } from '../../api/collections/advert';

interface CustomMapProps {
  adverts: PopulatedAdvert[]
}

export const CustomMap: FC<CustomMapProps> = (props) => {
  const markers = [
    {
      coords: [51.505, -0.09],
      message: 'Hello World!',
    },
    {
      coords: [51.51, -0.09],
      message: 'Ciao Mondo!',
    },
    {
      coords: [51.515, -0.09],
      message: 'Halo Welt!',
    },
  ];
  const customIcon = new Icon({
    iconUrl: markerIcon,
    iconSize: [38, 38],
  });

  return (
    <MapContainer
      style={{ width: '100vw', height: '100vh' }}
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              position={marker.coords as LatLngExpression}
              icon={customIcon}
            >
              <Popup>
                <h2>{marker.message}</h2>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
