import { Store } from "index";
import React from "react";
import { Text } from "components";
import { Ratings } from "./Ratings";
import { ProductAttribute } from "./ProductOverviewSection/ProductAttribute";

type OfferBarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    store: Store;
    quantity: number;
    price: number;
    date: Date;
  }>;

const OfferBar: React.FC<OfferBarProps> = (props) => {
  return (
    <div className="border border-gray_500 border-solid rounded-[15px] justify-start w-full">
      <div className="flex sm:flex-col flex-row gap-[70%] p-5 ml-1 mr-[20px] w-auto w-full">
        <div className="flex flex-col justify-start w-full sm:w-full">
          <Text
            className="font-light font-poppins text-black_900 w-full"
            as="h3"
            variant="h3"
          >
            {props?.store.storename}
          </Text>
          <Ratings rating={props?.store.rating}></Ratings>
        </div>
        <Text
          className="font-light font-poppins text-black_900"
          as="h3"
          variant="h3"
        >
          {props?.date.toLocaleDateString()}
        </Text>
      </div>
      <div className="flex flex-row gap-[10%] items-center justify-center p-5 w-auto w-auto">
        <ProductAttribute name="Quantity" value={props?.quantity} unit="pcs" />
        <ProductAttribute name="Price" value={props?.price} unit="$" />
      </div>
    </div>
  );
};

export { OfferBar };
