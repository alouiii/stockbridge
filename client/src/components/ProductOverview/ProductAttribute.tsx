import React, { FC } from 'react';
import { BodyText } from '../Text/BodyText';

type ProductAttributeProps = {
  name: string;
  value?: string | number | Date;
  unit?: string;
  border?: boolean;
  margin?: string;
  fontSize?: string;
};
const ProductAttribute: FC<ProductAttributeProps> = (props) => {
  return (
    <div
      style={{
        marginTop: props.margin ? props.margin : '',
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'start',
        alignItems: 'center',
        gap: 30,
      }}
    >
      <BodyText
        style={{
          fontWeight: 600,
          fontSize: props.fontSize ? props.fontSize : 20,
        }}
      >
        {props.name}:
      </BodyText>
      <BodyText
        style={{
          width: 150,
          borderRadius: 10,
          border: props?.border ? '2px solid black' : '',
          textAlign: props.border ? 'center' : 'start',
          fontSize: props.fontSize ? props.fontSize : 20,
          padding: 3

        }}
      >
        {`${props?.value} ${props?.unit ? props?.unit : ''}`}
      </BodyText>
    </div>
  );
};

export { ProductAttribute };
