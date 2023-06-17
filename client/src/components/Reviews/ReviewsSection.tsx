import { FC, useEffect, useState } from 'react';
import { getAllReviews, getReview, Review } from '../../api/collections/review';
import { getStore, User } from '../../api/collections/user';
import { ReviewOfferSection } from '../ProductOverview/ReviewOfferSection';
import { BodyText } from '../Text/BodyText';
import { Reviewbar } from './Reviewbar';

type ReviewsSectionProps = {
  advertID: string;
};
const ReviewsSection: FC<ReviewsSectionProps> = (props) => {
  const [reviews, setReviews] = useState(
    [] as { review: Review; store: User }[],
  );
  console.log(props.advertID);
  useEffect(() => {
    const fetchData = async () => {
      let allReviews = await getAllReviews();
      let fetchedReviews: { review: Review; store: User }[] = [];
      allReviews = allReviews.filter(
        (r) => r.reviewedAdvert === props.advertID,
      );
      console.log(allReviews);
      for (const review of allReviews) {
        const store = await getStore(review.reviewer);
        fetchedReviews.push({ review: review, store: store });
      }
      setReviews(fetchedReviews);
    };
    fetchData();
  }, []);
  return (
    <ReviewOfferSection section="REVIEWS">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          padding: '30px',
        }}
      >
        {reviews.map((r, i) => (
          <Reviewbar review={r.review} store={r.store} />
        ))}
      </div>
    </ReviewOfferSection>
  );
};

export { ReviewsSection };
