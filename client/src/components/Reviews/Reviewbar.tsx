import React, { useEffect, useState } from 'react';
import { ApiClient } from '../../api/apiClient';
import { getReview, Review } from '../../api/collections/review';
import { getStore, User } from '../../api/collections/user';
import { Ratings } from '../Ratings';
import { StoreDetailsModal } from '../Store/StoreDetailsModal';
import { BodyText } from '../Text/BodyText';


const Reviewbar = (reviewId: string) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };
  const openModal = () => {
    setShowModal(true);
  };
  const [review, setReview] = useState({} as Review);
  const [store, setStore] = useState({} as User)
  useEffect(() => {
    const fetchData = async () => {
      try { 
            if (reviewId) {
              const fetchedReview = await getReview(reviewId);
              if (fetchedReview.reviewer) {
               const fetchedStore = await getStore(fetchedReview.reviewer);
               setStore(fetchedStore);
              }
              setReview(fetchedReview as Review);
            }
    } catch (error) {
      console.error(error);
    }
    }
    fetchData()
  }, [])
  return (
    <>
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
            {store.name}
          </BodyText>
          {showModal && (
            <StoreDetailsModal
              isShowing={showModal}
              onClose={closeModal}
            ></StoreDetailsModal>
          )}

          <BodyText
            style={{
              font: 'light',
              fontFamily: 'Poppins',
              color: 'black',
              width: 'full',
            }}
          >
            {review.createdAt.toLocaleDateString()}
            {Ratings(review.rating ? review.rating : 0)}
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
            {review?.description}
          </BodyText>
        </div>
      </div>
    </>
  );
};

export { Reviewbar };
