import React from 'react';
import { BodyText } from '../Text/BodyText';

type ProductAttributeProps = {
  name: string;
  value?: string | number | Date;
  color?: string;
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
        textAlign: 'start',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
      }}
    >
      <BodyText
        style={{
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          width: '150px',
          fontSize: props.fontSize ? props.fontSize : '20px',
        }}
      >
        {props.name}:
      </BodyText>
      {props.color && <div style={{
        backgroundColor: props.color, 
        width: '3.5em', 
        height: '2em',
        borderRadius: '10px',
        position: 'relative',
        bottom: '0.4em',
        marginRight: '2%'
        
      }}/>}
      <BodyText
        style={{
          width: '150px',
          height: props.border ? '40px' : '',
          borderRadius: '10px',
          border: props?.border ? '3px solid black' : '',
          textAlign: props.border ? 'center' : 'start',
          justifyContent: 'start',
          fontFamily: 'Poppins',
          font: 'light',
          fontSize: props.fontSize ? props.fontSize : '20px',
        }}
      >
        {`${props?.value ?? ''} ${props?.unit ? props?.unit : ''}`}
      </BodyText>
    </div>
  );
};

export { ProductAttribute };
