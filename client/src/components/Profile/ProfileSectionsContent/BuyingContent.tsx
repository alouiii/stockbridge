import React, { ReactElement, useContext, useEffect, useState } from 'react';
import Tabs from '../../ContentTabs/Tabs';
import ContentTab from '../../ContentTabs/ContentTab';
import ProductInfoBar from '../ProductInfoBar';
import { LoginContext } from '../../../contexts/LoginContext';
import { PopulatedOffer, getUserSpecificOffers } from '../../../api/collections/offer';
import { PopulatedAdvert } from '../../../api/collections/advert';
import { OfferBar } from '../../Offers/OfferBar';
import NoResultsMessage from '../NoResultsMessage';

const products: {
  imageUrl: string;
  name: string;
  date: string;
  quantity: number;
  price: number;
}[] = [
  {
    imageUrl: 'https://placebear.com/g/200/200',
    name: 'Product Name',
    date: '01/01/2023',
    quantity: 10,
    price: 99.99,
  },

  {
    imageUrl: 'http://via.placeholder.com/120x120&text=image2',
    name: 'Product Testing Name 2',
    date: '01/01/2010',
    quantity: 100,
    price: 15,
  },
];

type Props = {
  children: ReactElement[];
};

/**
 * Component that displays the content of Buying section.
 */
const BuyingContent: React.FC<Props> = ({ children }) => {
  const { user, loggedIn } = useContext(LoginContext);
  const [outgoingOffers, setOutgoingOffers] = useState([] as PopulatedOffer[]);
  const [incomingOffers, setIncomingOffers] = useState([] as PopulatedOffer[]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('user id is coming')
        console.log(user?._id);

        const outgoingSell = await getUserSpecificOffers(user?._id as string, 'Ask', 'outgoing');
        const incomingSell = await getUserSpecificOffers(user?._id as string, 'Ask', 'incoming');
        
        setOutgoingOffers(outgoingSell as PopulatedOffer[]);
        setIncomingOffers(incomingSell as PopulatedOffer[]);
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
          {products.map((product, index) => {
            return (
              <ProductInfoBar
                productId={"ffffff"}
                imageUrl={product.imageUrl}
                name={product.name}
                date={product.date}
                quantity={product.quantity}
                price={product.price}
              />
            );
          })}
        </ContentTab>

        <ContentTab title="Incoming Offers">
        {incomingOffers.length > 0 ? incomingOffers.map((offer, _) => {
            return (
              <OfferBar offer={offer} advert={offer.advert as PopulatedAdvert} />
            );
          }) : <NoResultsMessage />}
        </ContentTab>
        <ContentTab title="Outgoing Offers">
        {outgoingOffers.length > 0 ? outgoingOffers.map((offer, _) => {
            return (
              <OfferBar offer={offer} advert={offer.advert as PopulatedAdvert} />
            );
          }) : <NoResultsMessage />}
        </ContentTab>
      </Tabs>
    </div>
  );
};

export default BuyingContent;
