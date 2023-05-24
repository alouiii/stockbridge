import React from "react";

import { Img, Text } from "components";

type SignupViewTwoAddpaymentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{ addapaymentmethOne: string }>;

const Addpayment: React.FC<SignupViewTwoAddpaymentProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <Img
          src="images/img_iconamoonsign.svg"
          className="h-[30px]"
          alt="iconamoonsign"
        />
        <Text className="font-poppins mt-[5px] text-gray_600" variant="body1">
          {props?.addapaymentmethOne}
        </Text>
      </div>
    </>
  );
};

Addpayment.defaultProps = {
  addapaymentmethOne: "Add a payment method",
};

export default Addpayment;
