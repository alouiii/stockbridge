import React, { useState } from 'react';
import { PopulatedUser } from '../../api/collections/user';
import { Ratings } from '../Ratings';
import { BodyText } from '../Text/BodyText';
import { StoreDetailsElement } from './StoreDetailsElement';
import { StoreDetailsModal } from './StoreDetailsModal';

type StoreDetailsBarProps = {
  category: string;
  store: PopulatedUser;
};

const StoreDetailsBar: React.FC<StoreDetailsBarProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  
  const fieldContainer = (message: string, value: string, rating = false) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '4%',
          alignItems: 'start',
          justifyContent: 'start',
          width: '50%',
        }}
      >
        <BodyText
          style={{
            color: '#7881D7',
            fontWeight: 600,
            fontSize: '24px',
          }}
        >
          {message}
        </BodyText>
        <div
          style={
            rating
              ? {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  justifyContent: 'start',
                }
              : {}
          }
        >
          <div
            style={{
              width: 'auto',
              fontWeight: 300,
              fontSize: '24px',
              fontFamily: 'Poppins',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              textDecorationColor: rating ? '#ffffff' : '',
            }}
          >
            <BodyText
              style={{
                textDecoration: rating ? 'underline' : '',
                cursor: rating ? 'pointer' : '',
              }}
              onClick={rating ? () => setShowModal(true) : () => {}}
            >
              {' '}
              {value}
            </BodyText>
            {rating &&
              Ratings(props.store?.rating ? props.store.rating : 0, 'red')}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div
      style={{
        backgroundColor: 'rgba(239, 68, 68, 0.55)',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 5,
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
          <BodyText style={{ color: 'white', fontSize: 24, margin: '0 5px' }}>
            {props.category}
          </BodyText>
        </StoreDetailsElement>
        <StoreDetailsElement label="Name">
          <BodyText
            style={{ color: 'white', fontSize: 24, margin: '0 5px' }}
            onClick={() => setShowModal(true)}
          >
            {props.store?.name}
          </BodyText>
        </StoreDetailsElement>
        <StoreDetailsElement label="Rating">
          <BodyText style={{ color: 'white', fontSize: 24, margin: '0 5px' }}>
            {Ratings(props.store?.rating ? props.store.rating : 0, 'white')}
          </BodyText>
        </StoreDetailsElement>
      </div>
      {showModal && (
        <StoreDetailsModal
          isShowing={showModal}
          store={props.store._id!}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export { StoreDetailsBar };
