import React, { useContext, useState } from 'react';

import { ProductDetailsTopBar } from './ProductDetailsTopBar';
import { ProductDetails } from './ProductDetails';

import { Button } from 'react-bootstrap';
import { PopulatedAdvert } from '../../api/collections/advert';
import { OfferModal } from '../Offers/OfferModal';
import { User } from '../../api/collections/user';
import { LoginContext } from '../../contexts/LoginContext';
import { PriorizationModal } from '../Priorization/PriorizationModal';

type ProductOverviewSectionProps = { advert: PopulatedAdvert; store: User };

const ProductOverviewSection: React.FC<ProductOverviewSectionProps> = (
  props,
) => {
  const { user } = useContext(LoginContext);
  const owner = user?._id === props.advert?.store?._id;
  const button_text = !owner
    ? props.advert?.type === 'Sell'
      ? 'Buy'
      : 'Sell'
    : props.advert?.prioritized
    ? 'Prioritized'
    : 'Prioritize';

  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showPriorizationModal, setShowPriorizationModal] = useState(false);
  const closeOfferModal = (rerender: boolean) => {
    setShowOfferModal(false);
    if (rerender) window.location.reload();
  };
  const closePriorizationModal = (rerender: boolean) => {
    setShowPriorizationModal(false);
    if (rerender) window.location.reload();
  };
  const openOfferModal = () => {
    setShowOfferModal(true);
  };
  const openPriorizationModal = () => {
    setShowPriorizationModal(true);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: '30px',
        width: 'auto',
      }}
    >
      <ProductDetailsTopBar owner={owner} advert={props.advert} />
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
        <OfferModal
          isShowing={showOfferModal}
          onClose={() => closeOfferModal(false)}
          onSave={() => closeOfferModal(true)}
          advert={props.advert}
          storeName={props.store.name}
          rating={props.store.rating}
        />
        <PriorizationModal
          isShowing={showPriorizationModal}
          onClose={closePriorizationModal}
        />
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
          onClick={owner ? openPriorizationModal : openOfferModal}
        >
          {button_text}
        </Button>
      </div>
    </div>
  );
};

export { ProductOverviewSection };
