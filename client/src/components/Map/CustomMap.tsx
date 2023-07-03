import React, { FC } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Image } from 'react-bootstrap';
import markerIcon from '../../assets/marker.svg';
import { PopulatedAdvert } from '../../api/collections/advert';

const token =
  'pk.eyJ1IjoibHVwczAwIiwiYSI6ImNsamxycTE5cDB4ODczZnFxd20zN3Nwa3UifQ.vfbeVhZbd__hGg3g9q-Ycg';

interface CustomMapProps {
  adverts: PopulatedAdvert[];
}

export const CustomMap: FC<CustomMapProps> = (props) => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactMapGl
        mapboxAccessToken={token}
        initialViewState={{
          longitude: 11.576124,
          latitude: 48.137154,
          zoom: 12,
        }}
        mapStyle="mapbox://styles/lups00/cljlsjqmg009601qy3s87c4g9"
      >
        <Marker longitude={11.576124} latitude={48.137154} anchor="bottom">
          <Image src={markerIcon} alt="marker" width={40} height={40} />
        </Marker>
      </ReactMapGl>
    </div>
  );
};
