import { Advert, PopulatedAdvert } from '../../api/collections/advert';
import { BodyText } from '../Text/BodyText';
import { ProductAttribute } from './ProductAttribute';
import { Image } from 'react-bootstrap';
import imagePlaceholder from '../../assets/product-placeholder.png';

const ProductDetails = (advert: PopulatedAdvert) => {
  console.log(advert);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        width: 'auto',
      }}
    >
      <Image
        style={{
          width: '20em',
          height: '20em',
          borderRadius: '60px',
          borderColor: 'transparent',
          objectFit: 'fill',
        }}
        src={advert?.imageurl ? advert?.imageurl : imagePlaceholder}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <BodyText
          style={{
            fontFamily: 'Poppins',
            color: 'black',
            fontSize: '24px',
            fontWeight: 600,
          }}
        >
          {advert.productname ? advert.productname : 'Fake Product Name'}
        </BodyText>
        <BodyText
          style={{
            fontFamily: 'Poppins',
            color: 'gray',
            fontSize: '16px',
            fontWeight: 300,
            marginLeft: '10px',
            wordBreak: 'break-all',
          }}
        >
          {advert?.description ? advert.description : ''}
        </BodyText>
        {advert?.color && (
          <ProductAttribute
            margin=""
            name="Color"
            value={advert?.color}
          ></ProductAttribute>
        )}
        {advert?.purchaseDate && (
          <ProductAttribute
            name="Purchased On"
            value={advert.purchaseDate.toString().substring(0, 10)}
          ></ProductAttribute>
        )}
        {advert?.expirationDate && (
          <ProductAttribute
            name="Expires On"
            value={`${advert.expirationDate.toString().substring(0, 10)}`}
          ></ProductAttribute>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20%',
            alignItems: 'start',
            justifyContent: 'start',
            marginTop: '5%',
            width: 'auto',
          }}
        >
          <ProductAttribute
            name="Quantity"
            value={advert?.quantity}
            unit="pcs"
            border={true}
          ></ProductAttribute>
          <ProductAttribute
            name="Price"
            value={advert?.price}
            unit="€"
            border={true}
          ></ProductAttribute>
        </div>
      </div>
    </div>
  );
};

export { ProductDetails };
