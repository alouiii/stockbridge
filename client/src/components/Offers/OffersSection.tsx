import { useEffect, useState } from 'react';
import { Advert } from '../../api/collections/advert';
import { Offer, OfferStatus } from '../../api/collections/offer';
import { BodyText } from '../Text/BodyText';
import { OfferSection } from './OfferSection';

const OffersSection = (offerIds: string[], advert: Advert) => {
  const [offers, setOffers] = useState([] as Offer[]);
  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  const openOffers = offers.filter((o) => o.status === OfferStatus.OPEN);
  const acceptedOffers = offers.filter(
    (o) => o.status === OfferStatus.ACCEPTED,
  );
  const rejectedOffers = offers.filter(
    (o) => o.status === OfferStatus.REJECTED,
  );
  const canceledOffers = offers.filter(
    (o) => o.status === OfferStatus.CANCELED,
  );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
      }}
    >
      <BodyText
        style={{
          fontFamily: 'poppins',
          color: 'black',
          fontSize: '36px',
          fontWeight: 600,
          paddingLeft: '10px',
          marginTop: '30px',
        }}
      >
        OFFERS
      </BodyText>
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {openOffers.length > 0 && (
          <OfferSection
            status={OfferStatus.OPEN}
            offers={openOffers}
            advert={advert}
          />
        )}
        {acceptedOffers.length > 0 && (
          <OfferSection
            status={OfferStatus.ACCEPTED}
            offers={acceptedOffers}
            advert={advert}
          />
        )}
        {rejectedOffers.length > 0 && (
          <OfferSection
            status={OfferStatus.REJECTED}
            offers={rejectedOffers}
            advert={advert}
          />
        )}
        {canceledOffers.length > 0 && (
          <OfferSection
            status={OfferStatus.CANCELED}
            offers={canceledOffers}
            advert={advert}
          />
        )}
      </div>
    </div>
  );
};

export { OffersSection };
