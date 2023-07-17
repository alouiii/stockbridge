import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Colors, getAdvert, PopulatedAdvert } from '../api/collections/advert';
import { OffersSection } from '../components/Offers/OffersSection';
import { Page } from '../components/Page';
import { ProductOverviewSection } from '../components/ProductOverview/ProductOverviewSection';
import { ReviewsSection } from '../components/Reviews/ReviewsSection';
import { StoreDetailsBar } from '../components/Store/StoreDetailsBar';
import { LoginContext } from '../contexts/LoginContext';

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
    createdAt: new Date(),
  } as PopulatedAdvert);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const fetchedAdvert = await getAdvert(id);
          setAdvert(fetchedAdvert as PopulatedAdvert);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const { user } = useContext(LoginContext);
  const owner = advert.store?._id === user?._id;
  return (
    <Page>
      {advert ? (
        <div
          style={{
            width: '100%',
            maxWidth: '100vw', // Set the maximum width to the viewport width
          }}
        >
          <StoreDetailsBar category={advert.category!} store={advert.store!} />
          <ProductOverviewSection advert={advert} store={advert.store!} />
          {owner && advert.offers && advert.offers.length > 0 && (
            <OffersSection
              advert={advert}
              storeName={advert.store?.name || ''}
              rating={advert.store?.rating || 0}
            />
          )}
          {advert.reviews && advert.reviews.length > 0 && advert._id && (
            <ReviewsSection advert={advert}/>
          )}
        </div>
      ) : (
        <Spinner role="status" />
      )}
    </Page>
  );
};

export default ProductOverview;
