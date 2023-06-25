import React, { ReactElement, useContext, useEffect, useState } from 'react';
import Tabs from '../../ContentTabs/Tabs';
import ContentTab from '../../ContentTabs/ContentTab';
import ProductInfoBar from '../ProductInfoBar';
import { Advert, getAdvert, getAllAdverts } from '../../../api/collections/advert';
import { LoginContext } from '../../../contexts/LoginContext';
import { getStore } from '../../../api/collections/user';


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
  const [adverts, setAdverts] = useState([] as Advert[]);
useEffect(() => {
  const fetchData = async () => {
    try {
        const fetchedAdverts = await getAllAdverts();
        // if (fetchedAdvert.store) {
        //   const fetchedStore = await getStore(fetchedAdvert.store);
        //   //setStore(fetchedStore);
        // }
        setAdverts(fetchedAdverts as Advert[]);
        console.log(fetchedAdverts);
      
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, []);

const { user, loggedIn } = useContext(LoginContext);
  
  return (
    <div>
      <Tabs>
        <ContentTab title="Buying Ads">
        {adverts.map((product, _) => {
            return (
              <ProductInfoBar
                imageUrl={product.imageurl}
                name={product.productname}
                date={product.purchaseDate?.toString().substring(0, 10)}
                quantity={product.quantity}
                price={product.price}
              />
            );
          })}
        </ContentTab>
        <ContentTab title="Selling Ads">
          Hola guys, this is the container for the selling Ads
        </ContentTab>
      </Tabs>
    </div>
  );
};

export default MyAdvertsContent;
