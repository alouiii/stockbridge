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
import { Button, Image } from 'react-bootstrap';
import sortingUpIcon from '../../../assets/sortUpAlt.svg';
import sortingDownIcon from '../../../assets/sortDownAlt.svg';
import {
  AdvertSortCriteria,
  ExtraCriteria,
  OfferSortCriteria,
} from '../../ContentTabs/Tabs';

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

  const [sortCriteria, setSortCriteria] = useState<
    AdvertSortCriteria | OfferSortCriteria
  >(AdvertSortCriteria.NONE);
  // False == order asc , True == order desc
  const [sortOrder, setSortOrder] = useState(false);

  const offerValues = [
    ...Object.values(AdvertSortCriteria),
    ...Object.values(ExtraCriteria),
  ];

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

  function sortedAndFilteredItems(list: PopulatedOffer[]): PopulatedOffer[] {
    let result = list.sort((a, b) => {
      switch (sortCriteria) {
        case AdvertSortCriteria.NONE:
          return 0;
        case AdvertSortCriteria.NAME:
          return (a.advert?.productname ?? '').localeCompare(
            b.advert?.productname ?? '',
          );
        case AdvertSortCriteria.DATE:
          return (a.createdAt ?? '') > (b.createdAt ?? '')
            ? 1
            : (a.createdAt ?? '') < (b.createdAt ?? '')
            ? -1
            : 0;
        case AdvertSortCriteria.PRICE:
          return (a.price ?? 0) - (b.price ?? 0);
        case AdvertSortCriteria.Quantity:
          return (a.quantity ?? 0) - (b.quantity ?? 0);
        case ExtraCriteria.STATUS:
          return (a.status ?? '').localeCompare(b.status ?? '');
        case ExtraCriteria.STORE:
          return (a?.advert?.store ?? '').localeCompare(b?.advert?.store ?? '');
        default:
          return 0;
      }
    });
    return sortOrder ? result : result.reverse();
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value as AdvertSortCriteria);
  };

  const handleToggleSortOrder = () => {
    setSortOrder(!sortOrder);
  };

  const renderOffers = (status: OfferStatus, offers: PopulatedOffer[]) => {
    return (
      <>
        {offers.length > 0 ? (
          <div style={{ padding: '0 30px 0', width: '100%' }}>
            <BodyText
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: colorMap(status),
                textAlign: 'center',
              }}
            >
              {status}
            </BodyText>
            <div>
              {offers.map((offer, index) => (
                <OfferCard
                  key={index}
                  status={status}
                  offer={offer}
                  advert={offer.advert as PopulatedAdvert}
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: -16,
        }}
      >
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
          {offerValues.map((item, _) => (
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

      {sortedAndFilteredItems(offers).length > 0 ? (
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
