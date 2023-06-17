import { FC, useEffect, useState } from 'react';
import { Advert } from '../../api/collections/advert';
import {
  getOffersByAdvert,
  Offer,
  OfferStatus,
} from '../../api/collections/offer';
import { ReviewOfferSection } from '../ProductOverview/ReviewOfferSection';
import { BodyText } from '../Text/BodyText';
import { OfferSection } from './OfferSection';

type OffersSectionProps = {
  advert: Advert;
  storeName: string;
};

const OffersSection: FC<OffersSectionProps> = (props) => {
  const [offers, setOffers] = useState([] as Offer[]);
  useEffect(() => {
    const fetchData = async () => {
      if (props.advert._id) {
        const fetchedOffers: Offer[] = await getOffersByAdvert(
          props.advert._id,
        );
        setOffers(fetchedOffers);
      }
    };
    fetchData();
  }, []);

  const openOffers = offers.filter((o) => o.status === 'Open');
  const acceptedOffers = offers.filter((o) => o.status === 'Accepted');
  const rejectedOffers = offers.filter((o) => o.status === 'Rejected');
  const canceledOffers = offers.filter((o) => o.status === 'Canceled');
  return (
    <ReviewOfferSection section="OFFERS">
      {openOffers.length > 0 && (
        <OfferSection
          status={OfferStatus.OPEN}
          offers={openOffers}
          advert={props.advert}
          storeName={props.storeName}
        />
      )}
      {acceptedOffers.length > 0 && (
        <OfferSection
          status={OfferStatus.ACCEPTED}
          offers={acceptedOffers}
          advert={props.advert}
          storeName={props.storeName}
        />
      )}
      {rejectedOffers.length > 0 && (
        <OfferSection
          status={OfferStatus.REJECTED}
          offers={rejectedOffers}
          advert={props.advert}
          storeName={props.storeName}
        />
      )}
      {canceledOffers.length > 0 && (
        <OfferSection
          status={OfferStatus.CANCELED}
          offers={canceledOffers}
          advert={props.advert}
          storeName={props.storeName}
        />
      )}
    </ReviewOfferSection>
  );
};

export { OffersSection };
