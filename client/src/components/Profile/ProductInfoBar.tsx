import React from 'react';
import { Image } from 'react-bootstrap';
import imagePlaceholder from '../../assets/product-placeholder.png';
import { ProfileProdcutAttribute } from './ProfileProdcutAttribute';
require('./profile.scss');

type ProductProps = {
  imageUrl: string | undefined;
  name: string | undefined;
  date: string | undefined;
  quantity: number | undefined;
  price: number | undefined;
};

const ProductInfoBar: React.FC<ProductProps> = ({
  imageUrl,
  name,
  date,
  quantity,
  price,
}) => {
  return (
    <li className="product-bar row">
      <div className="product-image col-2">
      <Image
          style={{
            width: '10em',
            height: '10em',
            borderRadius: '60px',
            borderColor: 'transparent',
            objectFit: 'fill',
            marginLeft: '3em'
          }}
          src={imageUrl ? imageUrl : imagePlaceholder}
        />
      </div>
      <div className="product-info col-10">
        <div className="product-details row">
          <div className="div1">  <ProfileProdcutAttribute
            name="Product"
            value={name}
          ></ProfileProdcutAttribute> </div>
          
          <div className="div2">  <ProfileProdcutAttribute
            name="Date"
            value={date}
          ></ProfileProdcutAttribute></div>
         
          <div className="div3">  <ProfileProdcutAttribute
            name="Quantity"
            value={quantity}
          ></ProfileProdcutAttribute></div>

          <div className="div4">  <ProfileProdcutAttribute
            name="Price"
            value={price}
            unit='€'
          ></ProfileProdcutAttribute></div>
        </div>
      </div>
    </li>
  );
};

export default ProductInfoBar;
