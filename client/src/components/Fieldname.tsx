import React from "react";

import { Text } from "components";

type FieldnameProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{ fieldname: string; one: string }>;

const Fieldname: React.FC<FieldnameProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <Text
          className="flex flex-row font-poppins items-center justify-start text-gray_600 tracking-[1.28px] uppercase w-full"
          variant="body3"
        >
          {props?.fieldname}
          {props?.one}
        </Text>
      </div>
    </>
  );
};

Fieldname.defaultProps = {
  fieldname: "Category",
  one: "*",
};

export {Fieldname};
