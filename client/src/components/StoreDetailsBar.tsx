import React from "react";
import { Text } from "components";
import { Ratings } from "components/Ratings";
import { Store } from "index";

type StoreDetailsBarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    store: Store;
  }>;

const StoreDetailsBar: React.FC<StoreDetailsBarProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <Text
          className="font-poppins gap-5 text-white_A700"
          as="h1"
          variant="h1"
        >
          STORE DETAILS
        </Text>
        <div className="flex flex-row gap-[15%] items-start justify-start w-full">
          <div className="flex flex-column gap-[4%] items-start justify-start w-auto">
            <Text
              className="font-light font-poppins text-indigo_600"
              style={{ color: "233FC8" }}
              as="h2"
              variant="h2"
            >
              Category:
            </Text>
            <Text
              className="font-light font-poppins text-white_A700"
              as="h2"
              variant="h2"
            >
              {props?.store.category}
            </Text>
          </div>

          <div className="flex flex-column gap-[4%] items-start justify-start w-full">
            <Text
              className="font-normal font-poppins text-indigo_600"
              as="h2"
              variant="h2"
            >
              Store:
            </Text>
            <div className="flex-row gap-7 itemts-center justify-start w-auto">
              <Text
                className="font-light font-poppins text-white_A700 underline w-[100%]"
                as="h2"
                variant="h2"
              >
                {props?.store.storename}
              </Text>
              <Ratings
                className="flex font-light font-poppins text-white_A700 w-auto"
                rating={props?.store.rating}
              ></Ratings>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { StoreDetailsBar };
