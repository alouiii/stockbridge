import React from 'react';
import { User } from '../../api/collections/user';
import { Ratings } from '../Ratings';
import { BodyText } from '../Text/BodyText';
import { StoreDetailsElement } from './StoreDetailsElement';

type StoreDetailsBarProps = {
  category?: string;
  store?: User;
};

const StoreDetailsBar: React.FC<StoreDetailsBarProps> = (props) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(239, 68, 68, 0.55)',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <div>
        <BodyText style={{ fontSize: 30, color: 'white', fontWeight: 600 }}>
          STORE DETAILS
        </BodyText>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <StoreDetailsElement label="Category">
          <BodyText style={{ color: 'white', fontSize: 24 }}>
            {props.category}
          </BodyText>
        </StoreDetailsElement>
        <StoreDetailsElement label="Name">
          <BodyText style={{ color: 'white', fontSize: 24 }}>
            {props.store?.name}
          </BodyText>
        </StoreDetailsElement>
        <StoreDetailsElement label="Rating">
          <BodyText style={{ color: 'white', fontSize: 24 }}>
            {Ratings(props.store?.rating ? props.store.rating : 0)}
          </BodyText>
        </StoreDetailsElement>
      </div>
    </div>
  );
};

export { StoreDetailsBar };
