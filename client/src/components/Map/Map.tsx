import React, { FC } from 'react';

import ReactMapGl from 'react-map-gl';

const token =
  'pk.eyJ1IjoibHVwczAwIiwiYSI6ImNsamxycTE5cDB4ODczZnFxd20zN3Nwa3UifQ.vfbeVhZbd__hGg3g9q-Ycg';
export const Map: FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactMapGl
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        mapboxAccessToken={token}
        style={{ width: '100%', height: '100%' }}
        mapStyle={'mapbox://styles/lups00/cljlsjqmg009601qy3s87c4g9'}
      ></ReactMapGl>
    </div>
  );
};
