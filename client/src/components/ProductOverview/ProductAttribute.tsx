import { fontSize } from '@mui/system';
import React from 'react';
import { BodyText } from '../Text/BodyText';

type ProductAttributeProps = {
  name: string;
  value?: string | number | Date;
  unit?: string;
  border?: boolean;
  margin?: string;
  fontSize?: string;
};
const ProductAttribute: React.FC<ProductAttributeProps> = (props) => {
  return (
    <div
      style={{
        marginTop: props.margin ? props.margin : '',
        display: 'flex',
        flexDirection: 'row',
        gap: props.border ? '7%' : '3%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'start',
        width: '100%',
        color: 'black',
      }}
    >
      <BodyText
        style={{
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          width: '100%',
          fontSize: props.fontSize ? props.fontSize : '20px',
        }}
      >
        {props.name}:{' '}
      </BodyText>
      <BodyText
        style={{
          width: props.border ? '150px' : '100%',
          height: props.border ? '40px' : '100%',
          borderRadius: '10px',
          border: props?.border ? '3px solid black' : '',
          textAlign: 'center',
          justifyContent: 'center',
          fontFamily: 'Poppins',
          font: 'light',
          fontSize: props.fontSize ? props.fontSize : '20px',
        }}
      >
        {`${props?.value} ${props?.unit ? props?.unit : ''}`}
      </BodyText>
    </div>
  );
};

export { ProductAttribute };
