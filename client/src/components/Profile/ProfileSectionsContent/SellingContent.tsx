import React, { ReactElement, useContext, useEffect, useState } from 'react';
import Tabs from '../../ContentTabs/Tabs';
import ContentTab from '../../ContentTabs/ContentTab';
import { LoginContext } from '../../../contexts/LoginContext';
import { Offer, getUserSpecificOffers } from '../../../api/collections/offer';
import { OfferBar } from '../../Offers/OfferBar';
import { Advert } from '../../../api/collections/advert';
import NoResultsMessage from '../NoResultsMessage';

type Props = {
  children: ReactElement[];
};

/**
 * Component that displays the content of Selling section.
 */
const SellingContent: React.FC<Props> = ({ children }) => {
  const { user, loggedIn } = useContext(LoginContext);
  const [outgoingOffers, setOutgoingOffers] = useState([] as Offer[]);
  const [incomingOffers, setIncomingOffers] = useState([] as Offer[]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('user id is ocming')
        console.log(user?._id);

        const outgoingSell = await getUserSpecificOffers(user?._id as string, 'Sell', 'outgoing');
        const incomingSell = await getUserSpecificOffers(user?._id as string, 'Sell', 'incoming');
        
        setOutgoingOffers(outgoingSell as Offer[]);
        setIncomingOffers(incomingSell as Offer[]);
        // Debug
        console.log(outgoingSell, incomingSell);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div>
      <Tabs>
        <ContentTab title="Orders">
          Ciao bella, this is the container for the Orders
        </ContentTab>
        <ContentTab title="Incoming Offers">
        {incomingOffers.length > 0 ? incomingOffers.map((offer, _) => {
            return (
              <OfferBar offer={offer} advert={offer.advert as Advert} />
            );
          }) : <NoResultsMessage />}
        </ContentTab>
        <ContentTab title="Outgoing Offers">
        {outgoingOffers.length > 0 ? outgoingOffers.map((offer, _) => {
            return (
              <OfferBar offer={offer} advert={offer.advert as Advert} />
            );
          }) : <NoResultsMessage />}
        </ContentTab>
      </Tabs>
    </div>
  );
};

export default SellingContent;
