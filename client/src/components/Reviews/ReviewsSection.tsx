import { FC } from 'react';
import { PopulatedAdvert } from '../../api/collections/advert';
import { ReviewOfferSection } from '../ProductOverview/ReviewOfferSection';
import { Reviewbar } from './Reviewbar';
import { ReviewsGrid } from '../ProductOverview/Reviews/ReviewsGrid';

type ReviewsSectionProps = {
  advert: PopulatedAdvert;
};
const ReviewsSection: FC<ReviewsSectionProps> = (props) => {
  return (
    <ReviewOfferSection section="REVIEWS">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
          padding: '0 30px 30px',
        }}
      >
        {/*props.advert.reviews &&
          props.advert.reviews.map((review, i) => (
            <Reviewbar key={review._id} reviewID={review._id} />
          ))*/}
          <ReviewsGrid reviews={props.advert.reviews}/>
      </div>
    </ReviewOfferSection>
  );
};

export { ReviewsSection };
