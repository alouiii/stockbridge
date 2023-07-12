import React, { FC, useEffect, useState } from 'react';
import { ReviewOfferSection } from '../ReviewOfferSection';
import { PopulatedAdvert } from '../../../api/collections/advert';
import {
  OfferStatus,
  PopulatedOffer,
  getOffersByAdvert,
} from '../../../api/collections/offer';
import { OfferCard } from './OfferCard';
import { BodyText } from '../../Text/BodyText';
import { colorMap } from '../../../utils/functions';

interface OffersSectionProps {
  advert: PopulatedAdvert;
  storeName: string;
  rating: number;
}

export interface OfferDisplay {
  offers: PopulatedOffer[];
  status: OfferStatus;
  storeName: string;
  rating: number;
}

export const OffersSection: FC<OffersSectionProps> = (props) => {
  const [offers, setOffers] = useState<PopulatedOffer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (props.advert._id) {
        try {
          const fetchedOffers = await getOffersByAdvert(props.advert._id);
          setOffers(fetchedOffers);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [props.advert._id]);

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

  const renderOffersForStatus = (status: OfferStatus) => {
    switch (status) {
      case OfferStatus.OPEN:
        return renderOffers(status, openOffers);
      case OfferStatus.ACCEPTED:
        return renderOffers(status, acceptedOffers);
      case OfferStatus.REJECTED:
        return renderOffers(status, rejectedOffers);
      case OfferStatus.CANCELED:
        return renderOffers(status, canceledOffers);
      default:
        return null;
    }
  };

  const renderOffers = (status: OfferStatus, offers: PopulatedOffer[]) => {
    return (
      <>
        {offers.length > 0 ? (
          <div style={{ padding: '0 30px 30px', width: '100%' }}>
            <BodyText
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: colorMap(status),
                textAlign: "center"
              }}
            >
              {status}
            </BodyText>
            <div>
              {offers.map((offer, index) => (
                <OfferCard
                  key={index}
                  status={status}
                  storeName={props.storeName}
                  rating={props.rating}
                  quantity={offer.quantity ?? 0}
                  price={offer.price ?? 0}
                  date={offer.createdAt ? new Date(offer.createdAt) : undefined}
                  style={{
                    borderColor: colorMap(status),
                    marginBottom: 50,
                  }}
                />
              ))}
            </div>
          </div>
        ) : undefined}
      </>
    );
  };

  return (
    <ReviewOfferSection section="OFFERS">
      {offers.length > 0 ? (
        Object.values(OfferStatus).map((status) => (
          <div
            key={status}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {renderOffersForStatus(status)}
          </div>
        ))
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 150,
          }}
        >
          <BodyText
            style={{
              color: 'red',
              fontSize: 30,
              textAlign: 'center',
            }}
          >
            No offers yet
          </BodyText>
        </div>
      )}
    </ReviewOfferSection>
  );
};
