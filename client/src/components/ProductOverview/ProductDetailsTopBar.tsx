import React, { useState } from 'react';
import edit from '../../assets/edit-pencil.svg';
import { Button, Image } from 'react-bootstrap';
import { Advert } from '../../api/collections/advert';
import { EditAdvertModal } from './EditAdvertModal';
import { BodyText } from '../Text/BodyText';

type ProductDetailsTopBarProps = Partial<{
  owner: boolean;
  advert?: Advert;
}>;

const ProductDetailsTopBar: React.FC<ProductDetailsTopBarProps> = (props) => {
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
        flexDirection: 'row',
        width: '100%',
      }}
    >
      <BodyText
        style={{
          fontFamily: 'poppins',
          color: 'black',
          width: '100%',
          fontSize: '36px',
          fontWeight: 600,
          paddingLeft: '10px',
        }}
      >
        PRODUCT DETAILS
      </BodyText>
      {props.owner && (
        <Button
          style={{
            width: 'full',
            marginRight: '20px',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
          onClick={openModal}
        >
          <Image src={edit}></Image>
        </Button>
      )}
      {showModal && (
        <EditAdvertModal
          isShowing={showModal}
          onClose={closeModal}
          advert={props.advert}
        />
      )}
    </div>
  );
};

export { ProductDetailsTopBar };
