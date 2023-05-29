import React from "react";

import { Button, Img, Text } from "components";
import { LanguageSettings } from "./LanguageSettings";
import { LegalSection } from "./LegalSection";

type selectOptionType = { value: string; label: string };

type BottombarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    yourwebsite2023One: string;
    terms: string;
    privacy: string;
    languageOptions: selectOptionType[];
    iconsmadebyfreeOne: string;
  }>;

const Bottombar: React.FC<BottombarProps> = (props) => {
  return (
    <>
      <div className="bg-red_300_4c flex flex-col font-poppins items-center justify-center mt-[2696px] w-[100%]">
        <div className="flex flex-col items-center justify-start pb-[18px] pl-[18px] w-[100%]">
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
                    className="font-poppins text-black_900_dd w-auto"
                    variant="body1"
                  >
                    {props?.yourwebsite2023One}
                  </Text>
                </div>
              </div>
              <LegalSection></LegalSection>
              <LanguageSettings
                languageList={props?.languageOptions}
              ></LanguageSettings>
            </div>
            <div className="flex flex-col items-start justify-start w-auto sm:w-full">
              <Text
                className="font-poppins text-black_900_dd w-auto"
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

Bottombar.defaultProps = {
  yourwebsite2023One: "© Your Website 2023",
  terms: "Terms",
  privacy: "Privacy",
  iconsmadebyfreeOne:
    "Icons made by Freepik from www.flaticon.com is licensed by CC 3.0 BY",
};

export { Bottombar };
