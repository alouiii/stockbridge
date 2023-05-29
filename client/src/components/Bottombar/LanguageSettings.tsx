import { Img } from "components/Img";
import { SelectBox } from "components/SelectBox";
import { Text } from "components";
import React from "react";

type selectOptionType = { value: string; label: string };

type LanguageSettingsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    languageList: selectOptionType[];
  }>;
const LanguageSettings: React.FC<LanguageSettingsProps> = (props) => {
  return (
    <div className="flex flex-col gap-[14.3px] items-start justify-start pl-10 sm:pl-5 pt-10 w-[190px]">
      <div className="flex flex-col gap-2 items-start justify-start pr-0.5 pt-0.5 w-full">
        <Text
          className="font-bold font-poppins text-black_900_dd uppercase"
          as="h6"
          variant="h6"
        >
          Language
        </Text>
        <div className="bg-black_900_dd h-0.5 w-[19%]"></div>
      </div>
      <div className="flex flex-col items-start justify-start w-auto sm:w-full">
        <SelectBox
          className="font-normal font-poppins text-base text-black_900_dd text-left w-full"
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
          options={props?.languageList}
          isSearchable={false}
          placeholder="English"
          size="md"
        />
      </div>
    </div>
  );
};

export default LanguageSettings;
