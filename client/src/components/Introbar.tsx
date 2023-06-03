import React from "react";

import { Img, Line, List, Text } from "components";

type HomepageIntrobarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    howitworks: string;
    one: string;
    searchforwhat: string;
    two: string;
    findtheitemyou: JSX.Element | string;
    three: string;
    makeanofferto: string;
  }>;

const HomepageIntrobar: React.FC<HomepageIntrobarProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col gap-1 items-center justify-center w-auto">
          <Text
            className="font-poppins text-black_900_dd uppercase w-auto"
            as="h2"
            variant="h2"
          >
            {props?.howitworks}
          </Text>
          <Line className="bg-red_300 h-1 w-[22%]" />
        </div>
        <div className="flex md:flex-col flex-row md:gap-10 gap-[70px] items-start justify-start w-auto md:w-full">
          <div className="flex flex-col gap-[30px] h-[242px] md:h-auto items-center justify-center w-[205px]">
            <div className="flex flex-col gap-[33px] items-center justify-start w-[13%] md:w-full">
              <Img
                src="images/img_vector.svg"
                className="h-[27px] w-[26px]"
                alt="vector"
              />
              <Text
                className="font-poppins text-red_300 w-auto"
                as="h4"
                variant="h4"
              >
                {props?.one}
              </Text>
            </div>
            <Text
              className="font-poppins leading-[26.00px] max-w-[178px] md:max-w-full text-black_900_dd text-center"
              as="h5"
              variant="h5"
            >
              {props?.searchforwhat}
            </Text>
          </div>
          <List
            className="sm:flex-col flex-row md:gap-10 gap-[70px] grid md:grid-cols-1 grid-cols-2 w-[72%] md:w-full"
            orientation="horizontal"
          >
            <div className="flex flex-col gap-[30px] h-[242px] md:h-auto items-center justify-center w-[305px]">
              <div className="flex flex-col gap-[33px] items-center justify-start w-[9%] md:w-full">
                <Img
                  src="images/img_offer.svg"
                  className="h-[30px] w-[26px]"
                  alt="offer"
                />
                <Text
                  className="font-poppins text-red_300 w-auto"
                  as="h4"
                  variant="h4"
                >
                  {props?.two}
                </Text>
              </div>
              <Text
                className="font-poppins leading-[26.00px] text-black_900_dd text-center"
                as="h5"
                variant="h5"
              >
                {props?.findtheitemyou}
              </Text>
            </div>
            <div className="flex flex-col gap-[30px] h-[242px] md:h-auto items-center justify-center w-[305px]">
              <div className="flex flex-col gap-[33px] items-center justify-start w-[9%] md:w-full">
                <Img
                  src="images/img_megaphone.svg"
                  className="h-[22px] w-[26px]"
                  alt="megaphone"
                />
                <Text
                  className="font-poppins text-red_300 w-auto"
                  as="h4"
                  variant="h4"
                >
                  {props?.three}
                </Text>
              </div>
              <Text
                className="font-poppins text-black_900_dd text-center w-auto"
                as="h5"
                variant="h5"
              >
                {props?.makeanofferto}
              </Text>
            </div>
          </List>
        </div>
      </div>
    </>
  );
};

HomepageIntrobar.defaultProps = {
  howitworks: "How it works",
  one: "1.",
  searchforwhat: "Search for what you are looking for.",
  two: "2.",
  findtheitemyou: (
    <>
      Find the item you are looking for
      <br />
      in the search results.
    </>
  ),
  three: "3.",
  makeanofferto: "Make an offer to the seller!",
};

export default HomepageIntrobar;
