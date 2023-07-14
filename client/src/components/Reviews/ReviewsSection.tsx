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
import useMediaQuery from '../../hooks/useMediaQuery';
import { BodyText } from '../Text/BodyText';
import sortingUpIcon from '../../assets/sortUpAlt.svg';
import sortingDownIcon from '../../assets/sortDownAlt.svg';

type ReviewsSectionProps = {
  advert: PopulatedAdvert;
};

export enum DisplayModality {
  LIST,
  GRID,
}

export interface ReviewDisplay {
  reviews: PopulatedReview[] | undefined;
}

export enum ReviewSortCriteria {
  NONE = 'Default',
  NAME = 'Name',
  DATE = 'Date',
  RATING = 'Rating',
}

const ReviewsSection: FC<ReviewsSectionProps> = (props) => {
  const matches = useMediaQuery('(min-width: 740px)');

  const [displayMod, setDisplayMod] = useState<DisplayModality>(
    DisplayModality.LIST,
  );

  const [populatedReviews, setPopulatedReviews] = useState<PopulatedReview[]>();

  const [sortCriteria, setSortCriteria] = useState<ReviewSortCriteria>(
    ReviewSortCriteria.NONE,
  );
  // False == order asc , True == order desc
  const [sortOrder, setSortOrder] = useState(false);

  const reviewValues = Object.values(ReviewSortCriteria);

  useEffect(() => {
    if (props.advert.reviews) {
      Promise.all(
        props.advert.reviews.map((review) => getReview(review._id)),
      ).then(
        //extract the populatedReviews
        (popReviews) => {
          setPopulatedReviews(popReviews);
        },
      );
    }
  }, [props.advert.reviews]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value as ReviewSortCriteria);
  };

  const handleToggleSortOrder = () => {
    setSortOrder(!sortOrder);
  };

  function sortedAndFilteredItems(list: PopulatedReview[]): PopulatedReview[] {
    let result = list.sort((a, b) => {
      switch (sortCriteria) {
        case ReviewSortCriteria.NONE:
          return 0;
        case ReviewSortCriteria.NAME:
          return (a.reviewer.name ?? '').localeCompare(b.reviewer.name ?? '');
        case ReviewSortCriteria.DATE:
          return (a.createdAt ?? '') > (b.createdAt ?? '')
            ? 1
            : (a.createdAt ?? '') < (b.createdAt ?? '')
            ? -1
            : 0;
        case ReviewSortCriteria.RATING:
          return (a.rating ?? 0) - (b.rating ?? 0);
        default:
          return 0;
      }
    });
    return sortOrder ? result : result.reverse();
  }

  return (
    <ReviewOfferSection section="REVIEWS">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
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
            width={35}
            height={35}
          />
        </Button>
        <BodyText
          style={{
            color: '#f86c6c',
            fontWeight: '500',
            fontSize: 23,
            marginBottom: 0,
            marginRight: 10,
          }}
        >
          Sort by
        </BodyText>
        <select
          onChange={handleSortChange}
          style={{
            padding: 6,
            borderRadius: 8,
            borderColor: '#f86c6c',
            color: 'grey',
            height: 33,
          }}
        >
          {reviewValues.map((item, _) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <Button
          style={{
            alignSelf: 'center',
            background: 'none',
            border: 'none',
          }}
          onClick={handleToggleSortOrder}
        >
          <Image
            src={!sortOrder ? sortingUpIcon : sortingDownIcon}
            width={33}
            height={33}
          />
        </Button>
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
        {displayMod === DisplayModality.LIST ? (
          <ReviewList reviews={sortedAndFilteredItems(populatedReviews ?? [])} />
        ) : (
          <ReviewsGrid reviews={sortedAndFilteredItems(populatedReviews ?? [])} />
        )}
      </div>
    </ReviewOfferSection>
  );
};

export { ReviewsSection };
