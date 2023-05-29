import React from "react";

import { Img, Text } from "components";

type HomepageHelpProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{ gotanyquestionsOne: string; weareheretohelpOne: string }>;

const HomepageHelp: React.FC<HomepageHelpProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="border-4 border-gray_900 border-solid flex flex-col items-center justify-end p-[13px]">
          <Text
            className="font-poppins text-black_900_dd text-center uppercase"
            as="h4"
            variant="h4"
          >
            {props?.gotanyquestionsOne}
          </Text>
        </div>
        <Text
          className="font-normal font-poppins text-black_900_dd text-center w-[299px]"
          as="h6"
          variant="h6"
        >
          {props?.weareheretohelpOne}
        </Text>
        <Img
          src="images/img_productbuoysvg.svg"
          className="h-[60px] w-[60px]"
          alt="productbuoysvg"
        />
      </div>
    </>
  );
};

HomepageHelp.defaultProps = {
  gotanyquestionsOne: "Got any questions? Need help?",
  weareheretohelpOne: "We are here to help. Get in touch!",
};

export default HomepageHelp;
