import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiClient } from '../api/apiClient';
import { Advert, Colors, getAdvert } from '../api/collections/advert';
import { getStore, User } from '../api/collections/user';
import { OffersSection } from '../components/Offers/OffersSection';
import { Page } from '../components/Page';
import { ProductOverviewSection } from '../components/ProductOverview/ProductOverviewSection';
import { ReviewsSection } from '../components/Reviews/ReviewsSection';
import { StoreDetailsBar } from '../components/Store/StoreDetailsBar';

const ProductOverview = () => {
  const { id } = useParams();
  let [advert, setAdvert] = useState({
    id: '',
    productname: '',
    prioritized: false,
    quantity: 0,
    description: '',
    price: 0,
    expirationDate: new Date(),
    purchaseDate: new Date(),
    status: '',
    type: '',
    category: '',
    offers: [],
    store: '',
    reviews: [],
    imageurl: '',
    color: Colors.Blue,
    createdAt: new Date()
  } as Advert);
  const [store, setStore] = useState({} as User);
  useEffect(() => {
    const fetchData = async () => {
    try {
          if (id) {
            const fetchedAdvert = await getAdvert(id);
            if (fetchedAdvert.store) {
             const fetchedStore = await getStore(fetchedAdvert.store);
             setStore(fetchedStore);
            }
            setAdvert(fetchedAdvert as Advert);
          }
  } catch (error) {
    console.error(error);
  }}
  fetchData()
}, []);
  
  const owner = store._id == localStorage.getItem('currentUser');
  return (
    <Page>
     
      {advert ? (
         <div
         style={{
          width: '100%',
          maxWidth: '100vw', // Set the maximum width to the viewport width
          
         }}>
        <StoreDetailsBar category={advert.category} store={store} />
        <ProductOverviewSection advert={advert}/>
        {(owner && advert.offers) && OffersSection(advert.offers, advert)}
        {advert.reviews && ReviewsSection(advert.reviews)}
        </div>
        ) : (
      <p>Loading ...</p>
    )}
      
    </Page>
  );
};

export default ProductOverview;
