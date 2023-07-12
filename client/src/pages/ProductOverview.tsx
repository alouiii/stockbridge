import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Colors, getAdvert, PopulatedAdvert } from '../api/collections/advert';
import { User } from '../api/collections/user';
import { Page } from '../components/Page';
import { ProductOverviewSection } from '../components/ProductOverview/ProductOverviewSection';
import { ReviewsSection } from '../components/Reviews/ReviewsSection';
import { StoreDetailsBar } from '../components/Store/StoreDetailsBar';
import { LoginContext } from '../contexts/LoginContext';
import { OffersSection } from '../components/ProductOverview/Offers/OffersSection';

const ProductOverview = () => {
  const { id } = useParams();
  const [advert, setAdvert] = useState({
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
    createdAt: new Date(),
  } as PopulatedAdvert);
  const [store, setStore] = useState({} as User);

  const { user } = useContext(LoginContext);
  const owner = store._id === user?._id;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const fetchedAdvert = await getAdvert(id);
          if (fetchedAdvert.store) {
            setStore(fetchedAdvert.store);
          }
          setAdvert(fetchedAdvert as PopulatedAdvert);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Page>
      {!isLoading ? (
        <div
          style={{
            width: '100%',
            maxWidth: '100vw', // Set the maximum width to the viewport width
          }}
        >
          <StoreDetailsBar category={advert.category} store={store} />
          <ProductOverviewSection advert={advert} store={store} />
          {owner && advert.offers && (
            <OffersSection
              advert={advert}
              storeName={store.name ?? ''}
              rating={store.rating ?? 0}
            />
          )}
          {advert.reviews && advert._id && <ReviewsSection advert={advert} />}
        </div>
      ) : undefined}
    </Page>
  );
};

export default ProductOverview;
