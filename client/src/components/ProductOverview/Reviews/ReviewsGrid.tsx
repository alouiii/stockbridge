import React, { FC } from 'react';
import { BodyText } from '../../Text/BodyText';
import { FadeLoader } from 'react-spinners';
import { palette } from '../../../utils/colors';
import ReactPaginate from 'react-paginate';
import { PopulatedReview, Review } from '../../../api/collections/review';
import { ReviewCard } from './ReviewCard';

interface ReviewGridProps {
  reviews: Review[] | undefined;
}

export const ReviewsGrid: FC<ReviewGridProps> = (props) => {

  return (
    <div
      className="row"
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 50,
        alignItems: 'center',
      }}
    >
      {props.reviews ? (
        props.reviews.length > 0 ? (
          props.reviews.map((item, index) => (
            <div
              className="col-md-4 mb-4"
              key={item._id}
              style={{
                flex: '1 0 300px',
                maxWidth: '300px',
                marginRight: '20px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ReviewCard key={index} name={item.reviewer ?? ""} date={item.createdAt} description={item.description} rating={item.rating}/>
            </div>
          ))
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              height: '100vh',
            }}
          >
            <BodyText
              style={{
                color: 'red',
                fontSize: 30,
                textAlign: 'center',
              }}
            >
              No reviews yet
            </BodyText>
          </div>
        )
      ) : (
        <FadeLoader color={palette.subSectionsBgAccent} />
      )}
      <ReactPaginate
        previousLabel="<"
        breakLabel="..."
        nextLabel=">"
        //onPageChange={props.handlePageClick}
        pageCount={props.reviews ? props.reviews?.length / 8 : 1}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
