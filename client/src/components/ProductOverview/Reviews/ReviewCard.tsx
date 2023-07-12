import React, { CSSProperties, FC } from 'react';
import { Ratings } from '../../Ratings';

interface ReviewCardProps {
  name: string;
  description: string;
  date: Date;
  rating: number;
  style?: CSSProperties
}

export const ReviewCard: FC<ReviewCardProps> = (props) => {
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
        ...props.style
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{props.name}</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <div>
            {props.date.toLocaleDateString('it', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })}
          </div>
          <div>{Ratings(props.rating ? props.rating : 0, 'red')}</div>
        </div>
      </div>
      <div
        style={{
          flexGrow: 1,
          wordBreak: 'break-all',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {props.description}
      </div>
    </div>
  );
};
