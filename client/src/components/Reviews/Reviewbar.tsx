import { FC, useEffect, useState } from 'react';
import { getReview, Review } from '../../api/collections/review';
import { getStore, User } from '../../api/collections/user';
import { Ratings } from '../Ratings';
import { StoreDetailsModal } from '../Store/StoreDetailsModal';
import { BodyText } from '../Text/BodyText';

type ReviewBarProps = {
  review?: Review;
  store?: User;
};
const Reviewbar: FC<ReviewBarProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };
  const openModal = () => {
    setShowModal(true);
  };
  return (
    <>
      {props.review && props.store && (
        <div
          style={{
            border: 'solid',
            borderColor: 'lightgray',
            borderRadius: '15px',
            justifyContent: 'start',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              paddingLeft: '30px',
              paddingTop: '30px',
              paddingRight: '20px',
              gap: '80%',
            }}
          >
            <BodyText
              style={{
                font: 'light',
                fontSize: '18px',
                fontFamily: 'Poppins',
                color: 'black',
                width: 'full',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={openModal}
            >
              {props.store.name}
            </BodyText>
            {showModal && (
              <StoreDetailsModal
                isShowing={showModal}
                onClose={closeModal}
                storeName={props.store.phoneNumber}
                rating={props.store.rating}
              ></StoreDetailsModal>
            )}

            <BodyText
              style={{
                font: 'light',
                fontFamily: 'Poppins',
                color: 'black',
                width: 'full',
                position: 'absolute',
                left: '85%',
              }}
            >
              {props.review.createdAt.toString().substring(0, 10)}
              {Ratings(props.review.rating ? props.review.rating : 0)}
            </BodyText>
          </div>
          <div
            style={{
              width: 'auto',
              display: 'flex',
              flexDirection: 'row',
              gap: '5%',
              alignItems: 'start',
              justifyContent: 'start',
              padding: '10px',
              marginLeft: '2%',
            }}
          >
            <BodyText style={{ color: 'GrayText', font: 'light' }}>
              {props.review?.description}
            </BodyText>
          </div>
        </div>
      )}
    </>
  );
};

export { Reviewbar };
