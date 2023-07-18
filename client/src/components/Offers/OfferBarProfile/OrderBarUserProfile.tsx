import React, { useEffect, useState } from 'react';
import { PopulatedOffer } from '../../../api/collections/offer';
import { Advert } from '../../../api/collections/advert';
import { User } from '../../../api/collections/user';
import { NestedPopulatedOrder } from '../../../api/collections/order';
import { OrderBarUserProfileInfo } from './OrderBarUserProfileInfo';

type OrderBarUserProfileProps = {
  order: NestedPopulatedOrder;
  advert: Advert;
  outgoing: boolean;
  highlight: string;
};

/**
 * This is an order bar for the userinfo page. To avoid breaking the product overview functionality.
 * @param props
 * @returns
 */
const OrderBarUserProfile: React.FC<OrderBarUserProfileProps> = (props) => {
  return (
    <>
      <OrderBarUserProfileInfo
        picture={props.advert?.imageurl}
        advert={props.advert}
        order={props.order}
        offer={props.order.offer as PopulatedOffer}
        outgoing={props.outgoing}
        highlight={props.highlight}
      />
    </>
  );
};

export { OrderBarUserProfile };
