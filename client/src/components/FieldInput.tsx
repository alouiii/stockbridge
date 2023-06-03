import React, { useState } from "react";

import { Input, SelectBox } from "components";
import { DatePickerComponent } from "./DatePicker";

type selectOptionType = { value: string; label: string };

export enum ProductFieldType {
  CATEGORY,
  DATE,
  COLOR,
  NUMBER,
  TEXT,
}

type FieldInputProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    type: ProductFieldType;
    fieldvalue: string | number;
    options?: selectOptionType[];
    placeholder: string;
    dimension?: string;
    value;
  }>;

const FieldInput: React.FC<FieldInputProps> = (props) => {
  switch (props.type) {
    case ProductFieldType.TEXT:
      return (
        <Input
          wrapClassName={props.dimension}
          className="font-normal leading-[normal] p-0 placeholder:text-gray_600 text-base text-gray_600 text-left w-full"
          name="inputfieldname"
          placeholder={props.placeholder}
          shape="RoundedBorder6"
          size="sm"
          variant="OutlineTransparent"
          value={props.value}
          onChange={props.onChange}
        >
          {props.fieldvalue}
        </Input>
      );
    case ProductFieldType.CATEGORY:
      return (
        <SelectBox
          className="font-normal leading-[normal] placeholder:text-gray_600 text-base text-gray_600 text-left"
          size="sm"
          isSearchable={false}
          placeholder={props.placeholder}
          shape="RoundedBorder6"
          isMulti={false}
          options={props.options}
          name="inputfieldname_One"
          variant="OutlineTransparent"
          value={props.value}
          onChange={props.onChange}
        />
      );
    case ProductFieldType.DATE:
      return (
        <DatePickerComponent
          className="font-normal leading-[normal] placeholder:text-gray_600 text-base text-gray_600 text-left"
          size="sm"
          placeholder={props.placeholder}
          shape="RoundedBorder6"
          variant="OutlineTransparent"
          onChange={props.onChange}
        ></DatePickerComponent>
      );
    case ProductFieldType.NUMBER:
      return (
        <Input
          wrapClassName="w-full"
          className="font-normal leading-[normal] p-0 placeholder:text-gray_600 text-base text-gray_600 text-left w-full"
          name="inputfieldname"
          placeholder={props.placeholder}
          shape="RoundedBorder6"
          size="sm"
          variant="OutlineTransparent"
          type="number"
          value={props.value}
          onChange={props.onChange}
        >
          {props.fieldvalue}
        </Input>
      );
  }
};

export { FieldInput };
