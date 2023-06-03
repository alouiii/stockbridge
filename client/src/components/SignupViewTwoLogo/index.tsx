import React from "react";

import { Img } from "components";

type SignupViewTwoLogoProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{}>;

const SignupViewTwoLogo: React.FC<SignupViewTwoLogoProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <Img
          src="images/logo.png"
          className="h-[88px] sm:h-auto object-cover w-full"
          alt="EightyOne"
        />
      </div>
    </>
  );
};

SignupViewTwoLogo.defaultProps = {};

export default SignupViewTwoLogo;
