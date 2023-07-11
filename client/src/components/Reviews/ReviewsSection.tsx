import { FC, useEffect, useState } from 'react';
import { PopulatedAdvert } from '../../api/collections/advert';
import { ReviewOfferSection } from '../ProductOverview/ReviewOfferSection';
//import { Reviewbar } from './Reviewbar';
import { ReviewsGrid } from '../ProductOverview/Reviews/ReviewsGrid';
import { PopulatedReview, getReview } from '../../api/collections/review';
import { ReviewList } from '../ProductOverview/Reviews/ReviewList';
import { Button, Image } from 'react-bootstrap';
import gridIcon from '../../assets/grid.svg';
import listIcon from '../../assets/list.svg';
import { Sort, SortTypes } from '../ProductOverview/Reviews/Sort';
import useMediaQuery from '../../hooks/useMediaQuery';

type ReviewsSectionProps = {
  advert: PopulatedAdvert;
};

enum DisplayModality {
  LIST,
  GRID,
}

export interface ReviewDisplay {
  reviews: PopulatedReview[] | undefined;
}

const ReviewsSection: FC<ReviewsSectionProps> = (props) => {
  const matches = useMediaQuery('(min-width: 740px)');

  const [displayMod, setDisplayMod] = useState<DisplayModality>(
    DisplayModality.LIST,
  );

  const [populatedReviews, setPopulatedReviews] = useState<PopulatedReview[]>();
  const [originalData, setOriginalData] = useState<PopulatedReview[]>([]); //to have a reference

  useEffect(() => {
    if (props.advert.reviews) {
      Promise.all(
        props.advert.reviews.map((review) => getReview(review._id)),
      ).then(
        //extract the populatedReviews
        (popReviews) => {
          setPopulatedReviews(popReviews)
          setOriginalData(popReviews)
        },
      );
    }
  }, [props.advert.reviews]);

  const handleSorting = (modality: SortTypes) => {
    if (modality !== SortTypes.NONE && populatedReviews) {
      let sortedData = [...populatedReviews];

      if (modality === SortTypes.RATING_ASC) {
        sortedData = sortedData.sort((a, b) => a.rating - b.rating);
      } else if (modality === SortTypes.RATING_DESC) {
        sortedData = sortedData.sort((a, b) => b.rating - a.rating);
      } else if (modality === SortTypes.DATE_ASC) {
        sortedData = sortedData.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
      } else if (modality === SortTypes.DATE_DESC) {
        sortedData = sortedData.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      }
      // Update the state with the sorted data
      setPopulatedReviews(sortedData);
    }
    else{
      setPopulatedReviews(originalData)
    }
  };

  return (
    <ReviewOfferSection section="REVIEWS">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 10,
          marginRight: 12,
          marginTop: -16,
        }}
      >
        <Button
          style={{
            background: 'transparent',
            border: 'transparent',
            display: !matches ? 'none' : undefined,
          }}
          onClick={() => {
            if (displayMod === DisplayModality.LIST) {
              setDisplayMod(DisplayModality.GRID);
            } else {
              setDisplayMod(DisplayModality.LIST);
            }
          }}
        >
          <Image
            src={displayMod === DisplayModality.LIST ? gridIcon : listIcon}
            width={40}
            height={40}
          />
        </Button>
        <Sort onModalitySelected={handleSorting} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
          padding: '0 30px 30px',
          marginTop: 30,
        }}
      >
        {/*props.advert.reviews &&
          props.advert.reviews.map((review, i) => (
            <Reviewbar key={review._id} reviewID={review._id} />
          ))*/}
        {displayMod === DisplayModality.LIST ? (
          <ReviewList reviews={populatedReviews} />
        ) : (
          <ReviewsGrid reviews={populatedReviews} />
        )}
      </div>
    </ReviewOfferSection>
  );
};

export { ReviewsSection };
