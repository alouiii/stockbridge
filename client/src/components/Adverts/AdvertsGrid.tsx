import React, { FC } from 'react';
import { PopulatedAdvert } from '../../api/collections/advert';
import { AdvertCard } from './AdvertCard';
import { BodyText } from '../Text/BodyText';
import { FadeLoader } from 'react-spinners';
import { palette } from '../../utils/colors';

interface AdvertGridProps {
    adverts: PopulatedAdvert[] | undefined
}

export const AdvertGrid: FC<AdvertGridProps> = (props) => {
  return (
    <div
      className="row"
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 125,
        paddingLeft: 55,
      }}
    >
      {props.adverts ? (
        props.adverts.length > 0 ? (
          props.adverts.map((item, index) => (
            <div className="col-md-4 mb-4" key={item._id}>
              <AdvertCard
                key={index}
                id={item._id}
                name={item.productname}
                price={item.price}
                quantity={item.quantity}
                icon={item.imageurl}
                description={item.description}
                prioritized={item.prioritized}
                creationDate={item.createdAt}
              />
            </div>
          ))
        ) : (
          <BodyText style={{ color: 'red', fontSize: 25 }}>
            No data found
          </BodyText>
        )
      ) : (
        <FadeLoader color={palette.subSectionsBgAccent} />
      )}
    </div>
  );
};
