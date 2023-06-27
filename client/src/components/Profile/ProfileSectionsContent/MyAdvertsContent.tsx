import React, { ReactElement, useContext, useEffect, useState } from 'react';
import Tabs from '../../ContentTabs/Tabs';
import ContentTab from '../../ContentTabs/ContentTab';
import ProductInfoBar from '../ProductInfoBar';
import { Advert, getAdvertsByUser } from '../../../api/collections/advert';
import NoResultsMessage from '../NoResultsMessage';
import { LoginContext } from '../../../contexts/LoginContext';


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
 * Component that displays the content of MyAdverts section.
 */
const MyAdvertsContent: React.FC<Props> = ({ children }) => {
  const [buyingAdverts, setBuyingAdverts] = useState([] as Advert[]);
  const [sellingAdverts, setSellingAdverts] = useState([] as Advert[]);
  const { user, loggedIn } = useContext(LoginContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAdverts = await getAdvertsByUser(user?._id);
        let sellingAds = fetchedAdverts.filter(x => x.type === 'Sell');
        setSellingAdverts(sellingAds as Advert[]);
        let buyingAds = fetchedAdverts.filter(x => x.type === 'Ask');
        setBuyingAdverts(buyingAds as Advert[]);
        console.log(sellingAds, buyingAds);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Tabs>
        <ContentTab title="Selling Ads">
          {sellingAdverts.length > 0 ? sellingAdverts.map((product, _) => {
            return (
              <ProductInfoBar
                productId={product._id}
                imageUrl={product.imageurl}
                name={product.productname}
                date={product.purchaseDate?.toString().substring(0, 10)}
                quantity={product.quantity}
                price={product.price}
              />
            );
          }) : <NoResultsMessage />}
        </ContentTab>
        <ContentTab title="Buying Ads">
          {buyingAdverts.length > 0 ? buyingAdverts.map((product, _) => {
            return (
              <ProductInfoBar
                productId={product._id}
                imageUrl={product.imageurl}
                name={product.productname}
                date={product.purchaseDate?.toString().substring(0, 10)}
                quantity={product.quantity}
                price={product.price}
              />
            );
          }) : <NoResultsMessage />}
        </ContentTab>
      </Tabs>
    </div>
  );
};

export default MyAdvertsContent;
