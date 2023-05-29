import React from "react";
import { Text } from "components";

const LegalSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-[6.3px] items-start justify-start pb-[3.24px] pl-10 sm:pl-5 pt-10 w-auto">
      <div className="flex flex-col gap-2 items-start justify-start pr-0.5 pt-0.5 w-full">
        <Text
          className="font-bold font-poppins text-black_900_dd uppercase"
          as="h6"
          variant="h6"
        >
          Legal
        </Text>
        <div className="bg-black_900_dd h-0.5 w-[18%]"></div>
      </div>
      <div className="flex flex-col gap-[7.87px] items-start justify-start pb-[4.88px] md:pr-10 sm:pr-5 pr-[103.66px] pt-[3px] w-auto">
        <Text
          className="font-poppins text-gray_900 underline w-auto"
          variant="body1"
        >
          Terms
        </Text>
        <Text
          className="font-poppins text-gray_900 underline w-auto"
          variant="body1"
        >
          Privacy
        </Text>
      </div>
    </div>
  );
};

export {LegalSection};
