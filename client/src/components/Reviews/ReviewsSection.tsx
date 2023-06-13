import { Review } from '../../api/collections/review';
import { BodyText } from '../Text/BodyText';
import { Reviewbar } from './Reviewbar';

const ReviewsSection = (reviews: string[]) => {
  if (reviews.length == 0) {
    reviews = [];
  }
  return (
    <div
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        width: 'full',
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
        REVIEWS
      </BodyText>
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {reviews.map((review) => (
          Reviewbar(review)
        ))}
      </div>
    </div>
  );
};

export { ReviewsSection };