import React, { CSSProperties, FC } from 'react';
import { BodyText } from '../../Text/BodyText';
import { Ratings } from '../../Ratings';
import { OfferStatus } from '../../../api/collections/offer';

interface OfferCardProps {
  storeName: string;
  quantity: number;
  price: number;
  date: Date | undefined;
  rating: number;
  status: OfferStatus;
  style?: CSSProperties;
}

export const OfferCard: FC<OfferCardProps> = (props) => {
  return (
    <div
      style={{
        minWidth: 300,
        minHeight: 150,
        border: '3px solid lightgray',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        ...props.style,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <BodyText style={{ fontSize: 18, marginBottom: 0 }}>
            {props.storeName}
          </BodyText>
          <div>{Ratings(props.rating ? props.rating : 0, 'red')}</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <BodyText style={{ fontSize: 18, marginBottom: 0 }}>
            {props.date
              ? props.date.toLocaleDateString('it', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                })
              : ''}
          </BodyText>
        </div>
      </div>
      <div
        style={{
          flexGrow: 1,
          wordBreak: 'break-all',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 50,
        }}
      >
        <BodyText style={{ fontWeight: 600, fontSize: 20, marginBottom: 0 }}>
          Quantity:{' '}
          <BodyText style={{ fontWeight: 400, display: 'inline',marginLeft: 10 }}>
            {props.quantity + '€'}
          </BodyText>
        </BodyText>
        <BodyText style={{ fontWeight: 600, fontSize: 20, marginBottom: 0 }}>
          Price:{' '}
          <BodyText style={{ fontWeight: 400, display: 'inline', marginLeft: 10 }}>
            {props.price + '€'}
          </BodyText>
        </BodyText>
      </div>
    </div>
  );
};
