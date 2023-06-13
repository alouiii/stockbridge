import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiClient } from '../api/apiClient';
import { Advert, Colors, getAdvert } from '../api/collections/advert';
import { getOffer, Offer } from '../api/collections/offer';
import { getReview, Review } from '../api/collections/review';
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
  } as Advert);
  const [offers, setOffers] = useState([] as Offer[]);
  const [reviews, setReviews] = useState([] as Review[]);
  const [store, setStore] = useState({} as User);
  const [user, setUser] = useState({} as User);
  useEffect(() => {
    const fetchData = async () => {
    try {
      const api = new ApiClient()
      await api.get('auth/verify', { withCredentials: true })
          const currentUser = localStorage.getItem('currentUser');
          if (currentUser) {
            setUser(JSON.parse(currentUser));
          }
          if (id) {
            const fetchedAdvert = await getAdvert(id);
            if (fetchedAdvert.store) {
             const fetchedStore = await getStore(fetchedAdvert.store);
             setStore(fetchedStore);
            }
            if (fetchedAdvert.offers) {
              const offers = []
              for (const offerID in fetchedAdvert.offers) {
                const fetchedOffer = await getOffer(offerID);
                offers.push(fetchedOffer);
              }
              setOffers(offers)
            }
            if (fetchedAdvert.reviews) {
              const reviews: Review[] = []
              for (const reviewID in fetchedAdvert.reviews) {
                const fetchedReview = await getReview(reviewID);
                offers.push(fetchedReview);
              }
              setReviews(reviews)
            }
            setAdvert(fetchedAdvert as Advert);
          }
  } catch (error) {
    console.error(error);
  }}
  fetchData()
}, []);
  
  const owner = store._id == user._id;
  /*  userID === advert?.issuer?.id && advert?.offers?.length > 0; */
  return (
    <Page>
     
      {advert ? (
         <div
         style={{
          width: '100%',
          maxWidth: '100vw', // Set the maximum width to the viewport width
          
         }}>
        <StoreDetailsBar category={advert.category} store={store} />
        <ProductOverviewSection advert={advert} advertID={id} />
        {owner && OffersSection(offers, advert)}
        {ReviewsSection(reviews)}
        </div>
        ) : (
      <p>Loading ...</p>
    )}
      
    </Page>
  );
};

export default ProductOverview;
