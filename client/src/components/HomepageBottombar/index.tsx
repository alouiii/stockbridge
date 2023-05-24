import React from "react";

import { Button, Img, SelectBox, Text } from "components";

type HomepageBottombarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    yourwebsite2023One: string;
    legal: string;
    terms: string;
    privacy: string;
    languageOne: string;
    iconsmadebyfreeOne: string;
  }>;

const languageTwoOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const HomepageBottombar: React.FC<HomepageBottombarProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-center justify-start pb-[18px] pl-[18px] w-[46%]">
          <div className="flex flex-col gap-[25px] items-center justify-start w-full">
            <div className="flex md:flex-col flex-row md:gap-5 items-end justify-evenly w-full">
              <div className="flex md:flex-1 flex-col items-center justify-end mb-0.5 md:mt-0 mt-6 pt-[17px] w-[42%] md:w-full">
                <div className="flex flex-row gap-2 items-start justify-start pl-4 md:pr-10 sm:pr-5 pr-[154px] pt-4 w-auto">
                  <Button
                    className="flex h-12 items-center justify-center w-12"
                    size="smIcn"
                    variant="icbFillOrange200"
                  >
                    <Img src="images/img_amuiboxroot.png" alt="amuiboxroot" />
                  </Button>
                  <Button
                    className="flex h-12 items-center justify-center w-12"
                    size="smIcn"
                    variant="icbFillOrange200"
                  >
                    <Img
                      src="images/img_amuiboxroot_48x48.png"
                      alt="amuiboxroot_One"
                    />
                  </Button>
                </div>
                <div className="flex flex-col items-start justify-start pb-[0.88px] pl-4 md:pr-10 sm:pr-5 pr-[94px] pt-[15px] w-auto">
                  <Text
                    className="font-worksans text-black_900_dd w-auto"
                    variant="body1"
                  >
                    {props?.yourwebsite2023One}
                  </Text>
                </div>
              </div>
              <div className="flex flex-col gap-[6.3px] items-start justify-start pb-[3.24px] pl-10 sm:pl-5 pt-10 w-auto">
                <div className="flex flex-col gap-2 items-start justify-start pr-0.5 pt-0.5 w-full">
                  <Text
                    className="font-bold font-roboto text-black_900_dd uppercase"
                    as="h6"
                    variant="h6"
                  >
                    {props?.legal}
                  </Text>
                  <div className="bg-black_900_dd h-0.5 w-[18%]"></div>
                </div>
                <div className="flex flex-col gap-[7.87px] items-start justify-start pb-[4.88px] md:pr-10 sm:pr-5 pr-[103.66px] pt-[3px] w-auto">
                  <Text
                    className="font-worksans text-gray_900 underline w-auto"
                    variant="body1"
                  >
                    {props?.terms}
                  </Text>
                  <Text
                    className="font-worksans text-gray_900 underline w-auto"
                    variant="body1"
                  >
                    {props?.privacy}
                  </Text>
                </div>
              </div>
              <div className="flex flex-col gap-[14.3px] items-start justify-start pl-10 sm:pl-5 pt-10 w-[190px]">
                <div className="flex flex-col gap-2 items-start justify-start pr-0.5 pt-0.5 w-full">
                  <Text
                    className="font-bold font-roboto text-black_900_dd uppercase"
                    as="h6"
                    variant="h6"
                  >
                    {props?.languageOne}
                  </Text>
                  <div className="bg-black_900_dd h-0.5 w-[19%]"></div>
                </div>
                <div className="flex flex-col items-start justify-start w-auto sm:w-full">
                  <SelectBox
                    className="font-normal font-worksans text-base text-black_900_dd text-left w-full"
                    placeholderClassName="text-black_900_dd"
                    indicator={
                      <Img
                        src="images/img_frame.svg"
                        className="h-6 mr-[0] w-6"
                        alt="Frame"
                      />
                    }
                    variant="OutlineGray30001"
                    isMulti={false}
                    name="language_Two"
                    options={languageTwoOptionsList}
                    isSearchable={false}
                    placeholder="English"
                    size="md"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-auto sm:w-full">
              <Text
                className="font-worksans text-black_900_dd w-auto"
                variant="body4"
              >
                {props?.iconsmadebyfreeOne}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

HomepageBottombar.defaultProps = {
  yourwebsite2023One: "© Your Website 2023",
  legal: "Legal",
  terms: "Terms",
  privacy: "Privacy",
  languageOne: "Language",
  iconsmadebyfreeOne:
    "Icons made by Freepik from www.flaticon.com is licensed by CC 3.0 BY",
};

export default HomepageBottombar;
