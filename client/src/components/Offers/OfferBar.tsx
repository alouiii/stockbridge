import React, { useState } from 'react';
import { ProductAttribute } from '../ProductOverview/ProductAttribute';
import { Offer } from '../../api/collections/offer';
import { Advert } from '../../api/collections/advert';
import { BodyText } from '../Text/BodyText';
import { OfferModal } from './OfferModal';
import { Ratings } from '../Ratings';
import { InfoBar } from '../ProductOverview/InfoBar';
require('./offerBarStyle.scss');

type OfferBarProps = {
  offer: Offer;
  advert: Advert;
  storeName: string;
  rating: number;
};

const OfferBar: React.FC<OfferBarProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    //change to set Advert
    window.location.reload();
  };
  const openModal = () => {
    setShowModal(true);
  };
  return (
    <>
      <InfoBar
        onClick={openModal}
        contentLine1={
          <>
            <BodyText
              style={{
                font: 'light',
                fontFamily: 'Poppins',
                color: 'black',
              }}
            >
              {props?.storeName ? props.storeName : 'No Name given'}
              {Ratings(props?.rating ? props.rating : 0)}
            </BodyText>
            <BodyText
              style={{
                font: 'light',
                fontFamily: 'Poppins',
                color: 'black',
              }}
            >
              {props?.offer?.createdAt?.toString().slice(0, 10)}
            </BodyText>
          </>
        }
        contentLine2={
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '10%',
            }}
          >
            <ProductAttribute
              name="Quantity"
              value={props?.offer?.quantity}
              unit="pcs"
            />
            <ProductAttribute
              name="Price"
              value={props?.offer?.price}
              unit="€"
            />
          </div>
        }
      />
      {showModal && (
        <OfferModal
          isShowing={showModal}
          onClose={closeModal}
          advert={props.advert}
          offer={props.offer}
          storeName={props.storeName}
          rating={props.rating}
        />
      )}
    </>
  );
};

export { OfferBar };
