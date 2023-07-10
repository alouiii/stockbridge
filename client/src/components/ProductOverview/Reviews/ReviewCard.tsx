import React, { FC } from 'react';

interface ReviewCardProps {
  name: string;
  description: string;
  date: Date;
  rating: number;
}

export const ReviewCard: FC<ReviewCardProps> = (props) => {
  return (
    <div
      style={{
        minHeight: 100,
        border: '1px solid gray',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{'Orchids'}</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <div>10.05.23</div>
          <div>{"5"}</div>
        </div>
      </div>
      <div
        style={{
          flexGrow: 1,
          wordBreak: 'break-all',
        }}
      >
        {'kksjfksjfkdjfksdjfksdkfjskjfksjfksjkfjsdkjdkdksjdksakdjaskjdkasjdkajskdaskdjkfksdjfkskfskf'}
      </div>
    </div>
  );
};
