import { FC, useEffect, useState } from 'react';
import { getAllReviews, getReview, Review } from '../../api/collections/review';
import { getStore, User } from '../../api/collections/user';
import { BodyText } from '../Text/BodyText';
import { Reviewbar } from './Reviewbar';

type ReviewsSectionProps = {
  advertID: string;
};
const ReviewsSection: FC<ReviewsSectionProps> = (props) => {
  const [reviews, setReviews] = useState(
    [] as { review: Review; store: User }[],
  );
  useEffect(() => {
    const fetchData = async () => {
      let allReviews = await getAllReviews();
      let fetchedReviews: { review: Review; store: User }[] = [];
      allReviews = allReviews.filter(
        (r) => r.reviewedAdvert === props.advertID,
      );
      for (const review of allReviews) {
        const store = await getStore(review.reviewer);
        fetchedReviews.push({ review: review, store: store });
      }
      setReviews(fetchedReviews);
    };
    fetchData();
  }, []);
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
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        {reviews.map((r, i) => (
          <Reviewbar review={r.review} store={r.store} />
        ))}
      </div>
    </div>
  );
};

export { ReviewsSection };
