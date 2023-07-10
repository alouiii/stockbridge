import React, { useState } from 'react';
import edit from '../../assets/edit-pencil.svg';
import review from '../../assets/carbon_review.svg';
import { Button, Image } from 'react-bootstrap';
import { PopulatedAdvert } from '../../api/collections/advert';
import { EditAdvertModal } from './EditAdvertModal';
import { BodyText } from '../Text/BodyText';
import { EditReviewModal } from './EditReviewModal';

type ProductDetailsTopBarProps = {
  owner: boolean;
  advert: PopulatedAdvert;
};

const ProductDetailsTopBar: React.FC<ProductDetailsTopBarProps> = (props) => {
  const [showAdvertModal, setShowAdvertModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const closeModal = () => {
    if (props.owner) {
      setShowAdvertModal(false);
    } else {
      setShowReviewModal(false);
    }
  };
  const openModal = () => {
    if (props.owner) {
      setShowAdvertModal(true);
    } else {
      setShowReviewModal(true);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FDDFE3',
        paddingLeft: 15,
        height: 100,
      }}
    >
      <BodyText
        style={{
          fontSize: 30,
          fontWeight: 600,
          marginBottom: 0,
        }}
      >
        PRODUCT DETAILS
      </BodyText>
      <Button
        style={{
          backgroundColor: 'transparent',
          border: 'none',
        }}
        onClick={openModal}
      >
        <Image src={props.owner ? edit : review} width={40} height={40} />
      </Button>
      {showAdvertModal && (
        <EditAdvertModal
          isShowing={showAdvertModal}
          onClose={closeModal}
          advert={props.advert}
        />
      )}
      {showReviewModal && (
        <EditReviewModal
          isShowing={showReviewModal}
          onClose={closeModal}
          advert={props.advert}
        />
      )}
    </div>
  );
};

export { ProductDetailsTopBar };
