import React from "react";
import { List, Text } from "components";
import { OfferBar } from "./OfferBar";
import { Offer, OfferStatus } from "index";

type OfferSectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    status: OfferStatus;
    offers: Offer[];
  }>;

function colorMap(status: OfferStatus): string {
  switch (status) {
    case OfferStatus.OPEN:
      return "#4285F4";
    case OfferStatus.ACCEPTED:
      return "#4ECBA9";
    case OfferStatus.REJECTED:
      return "red";
    case OfferStatus.CANCELED:
      return "#ffc071";
  }
}

const OfferSection: React.FC<OfferSectionProps> = (props) => {
  return (
    <div className="flex flex-col items-center pt-[7%]">
      <Text
        className="font-poppins"
        as="h4"
        variant="h4"
        style={{ color: colorMap(props.status) }}
      >
        {props.status}
      </Text>
      <List
        className="font-poppins gap-[20%] grid items-center mt-[37px] w-[100%]"
        orientation="vertical"
      >
        {props?.offers.map((props, index) => (
          <React.Fragment key={`ProductOverviewViewerReviewbar${index}`}>
            <OfferBar {...props} />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export { OfferSection };
