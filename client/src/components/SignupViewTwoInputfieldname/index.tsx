import React from "react";

import { Text } from "components";

type SignupViewTwoInputfieldnameProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{ fieldfilling: string }>;

const SignupViewTwoInputfieldname: React.FC<
  SignupViewTwoInputfieldnameProps
> = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-start justify-start pr-0.5 pt-0.5">
          <Text className="font-poppins text-gray_600" variant="body1">
            {props?.fieldfilling}
          </Text>
        </div>
      </div>
    </>
  );
};

SignupViewTwoInputfieldname.defaultProps = { fieldfilling: "field filling" };

export default SignupViewTwoInputfieldname;
