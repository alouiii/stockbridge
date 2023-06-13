import React, { useState } from 'react';

import { ProductDetailsTopBar } from './ProductDetailsTopBar';
import { ProductDetails } from './ProductDetails';

import { Button } from 'react-bootstrap';
import { Advert } from '../../api/collections/advert';
import { OfferModal } from '../Offers/OfferModal';

type ProductOverviewSectionProps = { advert: Advert };

const ProductOverviewSection: React.FC<ProductOverviewSectionProps> = (
  props,
) => {
  let currentUser: { [x: string]: any } | null = null;
  const localUser = localStorage.getItem('currentUser');
  if (localUser !== null) {
    currentUser = JSON.parse(localUser);
  }
  const owner = currentUser?._id === props.advert?.store;
  const button_text = !owner
    ? props.advert?.type === 'Sell'
      ? 'Buy'
      : 'Sell'
    : props.advert?.prioritized
    ? 'Prioritized'
    : 'Prioritize';

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };
  const openModal = () => {
    setShowModal(true);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: '30px',
        width: 'auto',
        marginTop: '10%',
      }}
    >
      <ProductDetailsTopBar
        owner={owner}
        advert={props.advert}
      ></ProductDetailsTopBar>
      <div
        style={{
          background: '#FDDFE3',
          alignItems: 'start',
          justifyContent: 'start',
          paddingLeft: '3%',
          width: '100%',
          padding: '40px',
        }}
      >
        {props.advert && ProductDetails(props.advert)}
        {showModal && (
          <OfferModal
            isShowing={showModal}
            onClose={closeModal}
            advert={props.advert}
          />
        )}
        <Button
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            fontFamily: 'Poppins',
            width: '150px',
            marginLeft: '85%',
            marginTop: '25px',
            fontSize: '24px',
            textAlign: 'center',
            color: 'white',
            textDecoration: 'none',
            padding: '7px',
            border: 'rounded-md',
            backgroundColor: 'black',
            borderColor: 'black',
          }}
          onClick={openModal}
        >
          {button_text}
        </Button>
      </div>
    </div>
  );
};

export { ProductOverviewSection };
