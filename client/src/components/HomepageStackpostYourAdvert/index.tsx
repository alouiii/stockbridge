import React from "react";

import { Button, Img, Line, Text } from "components";
import { useNavigate } from "react-router-dom";

type HomepageStackpostYourAdvertProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    buttonText: string;
    or: string;
    language: JSX.Element | string;
    locationOne: string;
    category: string;
    whatareyousearcOne: string;
    search: string;
  }>;

const HomepageStackpostYourAdvert: React.FC<
  HomepageStackpostYourAdvertProps
> = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={props.className}>
        <Img
          src="images/img_image26.png"
          className="absolute h-[789px] inset-[0] justify-center m-auto object-cover w-full"
          alt="imageTwentySix"
        />
        <div className="absolute bg-indigo_800_cc flex flex-col h-full inset-[0] items-end justify-center m-auto p-0.5 w-full">
          <div className="flex flex-col md:gap-10 gap-[93px] justify-start mb-[212px] mt-[77px] w-[94%] md:w-full">
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between ml-2.5 md:ml-[0] w-full">
              <div className="flex md:flex-1 flex-col md:gap-10 gap-20 justify-start md:mt-0 mt-[138px] w-[21%] md:w-full">
                <Button
                  className="cursor-pointer font-bold font-poppins h-[52px] text-base text-center text-white_A700 uppercase w-[295px]"
                  shape="CircleBorder26"
                  size="md"
                  variant="FillRed300"
                  onClick={() => navigate("/signinview")}
                >
                  {props?.buttonText}
                </Button>
                <div className="h-12 md:ml-[0] ml-[22px] relative w-[68%]">
                  <Img
                    src="images/img_hrmy3.svg"
                    className="absolute h-[27px] inset-[0] justify-center m-auto"
                    alt="hrmyThree"
                  />
                  <Text
                    className="absolute font-normal font-poppins h-full inset-[0] justify-center m-auto text-center text-white_A700 tracking-[3.20px] w-max"
                    as="h3"
                    variant="h3"
                  >
                    {props?.or}
                  </Text>
                </div>
              </div>
              <div className="flex md:flex-1 flex-col justify-start pb-[70px] w-[39%] md:w-full">
                <Img
                  src="images/img_productherowonderpng.png"
                  className="h-20 md:h-auto md:ml-[0] ml-[179px] object-cover w-[28%]"
                  alt="productherowond"
                />
                <div className="flex flex-col items-center justify-start pt-[35px] w-full">
                  <Text
                    className="font-poppins leading-[57.00px] text-center text-white_A700 uppercase"
                    as="h2"
                    variant="h2"
                  >
                    {props?.language}
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start p-2.5 w-auto md:w-full">
              <div className="bg-white_A700 flex md:flex-col flex-row md:gap-5 items-center justify-center px-[5px] rounded-[27px] w-auto md:w-full">
                <div className="flex flex-col items-center justify-start px-2.5 py-[5px] w-auto">
                  <div className="flex flex-row gap-[30px] h-11 md:h-auto items-center justify-start px-2.5 py-[9px]">
                    <div className="flex flex-col items-start justify-start md:pr-10 sm:pr-5 pr-[132px] w-[126px]">
                      <Text
                        className="font-poppins text-gray_600 w-auto"
                        variant="body1"
                      >
                        {props?.locationOne}
                      </Text>
                    </div>
                    <Img
                      src="images/img_settings.svg"
                      className="h-3 w-3"
                      alt="settings"
                    />
                    <Line className="bg-gray_300 h-[25px] w-px" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start px-2.5 py-[5px] w-auto">
                  <div className="flex flex-row gap-[30px] h-11 md:h-auto items-center justify-start px-2.5 py-[9px]">
                    <div className="flex flex-col items-start justify-start md:pr-10 sm:pr-5 pr-[132px] w-[126px]">
                      <Text
                        className="font-poppins text-gray_600 w-auto"
                        variant="body1"
                      >
                        {props?.category}
                      </Text>
                    </div>
                    <div className="flex flex-col h-6 md:h-auto items-center justify-center w-6">
                      <Img
                        src="images/img_vector_gray_600.svg"
                        className="h-6 w-6"
                        alt="dropdownicon"
                      />
                    </div>
                    <Line className="bg-gray_300 h-[25px] w-px" />
                  </div>
                </div>
                <div className="flex flex-col h-11 md:h-auto items-center justify-center px-2.5 w-auto">
                  <div className="flex flex-col items-start justify-start pb-[9.3px] pt-[9.29px] px-3 w-auto">
                    <div className="flex flex-col items-start justify-start md:pr-10 sm:pr-5 pr-[83.33px] w-auto">
                      <Text
                        className="font-poppins text-gray_600 w-auto"
                        variant="body1"
                      >
                        {props?.whatareyousearcOne}
                      </Text>
                    </div>
                  </div>
                </div>
                <Button
                  className="cursor-pointer font-bold font-poppins h-[42px] text-base text-center text-white_A700 uppercase w-[171px]"
                  shape="CircleBorder21"
                  size="sm"
                  variant="FillRed300"
                >
                  {props?.search}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

HomepageStackpostYourAdvert.defaultProps = {
  buttonText: "Post your advert",
  or: "OR",
  language: (
    <>
      Out of stock? or got
      <br />
      too much stock?
      <br />
      No worries!{" "}
    </>
  ),
  locationOne: "Location",
  category: "Category",
  whatareyousearcOne: "What are you searching for?",
  search: "Search",
};

export default HomepageStackpostYourAdvert;
