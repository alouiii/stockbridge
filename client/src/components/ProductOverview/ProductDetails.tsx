import { PopulatedAdvert } from '../../api/collections/advert';
import { BodyText } from '../Text/BodyText';
import { ProductAttribute } from './ProductAttribute';
import { Image } from 'react-bootstrap';
import imagePlaceholder from '../../assets/product-placeholder.png';
import { FC } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { palette } from '../../utils/colors';

interface ProductDetailsProps {
  advert: PopulatedAdvert;
}

export const ProductDetails: FC<ProductDetailsProps> = (props) => {
  const { advert } = props;

  const matches1 = useMediaQuery('(min-width: 1000px)');
  const matches2 = useMediaQuery('(min-width: 850px)');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: matches2 ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: matches2 ? undefined : 'center',
        gap: 50,
      }}
    >
      <Image
        style={{
          width: matches2 ? 350 : 200,
          height: matches2 ? 350 : 200,
          borderRadius: 30,
          borderColor: 'transparent',
          objectFit: 'cover',
        }}
        src={advert?.imageurl ? advert?.imageurl : imagePlaceholder}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 50,
            alignItems: 'center',
          }}
        >
          <BodyText
            style={{
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            {advert.productname ? advert.productname : 'N.A'}
          </BodyText>
          <div
            style={{
              backgroundColor: palette.subSectionsBgAccent,
              borderRadius: 15,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 25,
              paddingRight: 25,
              height: 30,
              marginBottom: 16,
            }}
          >
            <BodyText
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: 'white',
                marginBottom: 0,
              }}
            >
              {advert.type ? advert.type : 'N.A'}
            </BodyText>
          </div>
          {advert.prioritized ? (
            <div
              style={{
                backgroundColor: palette.subSectionsBgAccent,
                borderRadius: 15,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 25,
                paddingRight: 25,
                height: 30,
                marginBottom: 16,
                marginLeft: -30
              }}
            >
              <BodyText
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'white',
                  marginBottom: 0,
                }}
              >
                Prioritized
              </BodyText>
            </div>
          ) : undefined}
        </div>
        <BodyText
          style={{
            color: 'gray',
            fontSize: 16,
            fontWeight: 300,
            marginTop: -16,
            wordBreak: 'break-all',
          }}
        >
          {advert?.description ? advert.description : ''}
        </BodyText>
        <ProductAttribute name="Color" value={advert?.color ?? 'N.A'} />
        <ProductAttribute
          name="Purchased On"
          value={
            advert.purchaseDate
              ? advert.purchaseDate.toString().substring(0, 10)
              : 'N.A'
          }
        />
        <ProductAttribute
          name="Expires On"
          value={
            advert.expirationDate
              ? advert.expirationDate.toString().substring(0, 10)
              : 'N.A'
          }
        />
        <div
          style={{
            display: 'flex',
            flexDirection: matches1 ? 'row' : 'column',
            gap: matches1 ? 50 : 0,
          }}
        >
          <ProductAttribute
            name="Quantity"
            value={advert?.quantity}
            unit="pcs"
            border={true}
          />
          <ProductAttribute
            name="Price"
            value={advert?.price}
            unit="€"
            border={true}
          />
        </div>
      </div>
    </div>
  );
};
