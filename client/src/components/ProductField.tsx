import React from "react";

import { Text, Input, FieldInput } from "components";
export enum ProductFieldType {
  CATEGORY,
  DATE,
  COLOR,
  NUMBER,
  TEXT,
}
type selectOptionType = { value: string; label: string };

type ProductFieldProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    type: ProductFieldType;
    create: boolean;
    fieldname: string;
    options?: selectOptionType[];
    placeholder: string;
    dimension?: string;
    value: string | number | boolean;
  }>;

const ProductField: React.FC<ProductFieldProps> = (props) => {
  return (
    <div className="flex flex-col gap-3">
      <Text>{props.fieldname}:</Text>
      {props.create && (
        <FieldInput
          type={props.type}
          options={props?.options}
          placeholder={props.placeholder}
          dimension={props.dimension}
          value={props.value}
          onChange={props.onChange}
        ></FieldInput>
      )}
    </div>
  );
};

export { ProductField };
