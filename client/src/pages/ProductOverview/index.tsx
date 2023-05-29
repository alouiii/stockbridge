import React, { useEffect, useState } from "react";

import { Bottombar, Topbar, StoreDetailsBar, List, Text } from "components";
import { ProductOverviewSection } from "components/ProductOverviewSection";
import { Reviewbar } from "components/Reviewbar";
import { OfferStatus } from "index";
import { OfferSection } from "components/OfferSection";
import { useParams } from "react-router-dom";

type ProductOverviewProps = Partial<{
  userid: number;
}>;

const ProductOverview: React.FC<ProductOverviewProps> = (props) => {
  const [advert, setElement] = useState(null);
  const advertID = useParams();
  useEffect(() => {
    const fetchElement = async () => {
      try {
        const response = await fetch(`/api/adverts/${advertID}`);
        const data = await response.json();
        setElement(data);
      } catch (error) {
        console.error("Error fetching element:", error);
      }
    };
    fetchElement();
  }, []);
  const owner = props?.userid === advert.store.id && advert.offers?.length > 0;
  const openOffers = advert.offers?.filter(
    (o) => o.status === OfferStatus.OPEN
  );
  const acceptedOffers = advert.offers?.filter(
    (o) => o.status === OfferStatus.ACCEPTED
  );
  const rejectedOffers = advert.offers?.filter(
    (o) => o.status === OfferStatus.REJECTED
  );
  const canceledOffers = advert.offers?.filter(
    (o) => o.status === OfferStatus.CANCELED
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
      className=" bg-gray_50_02 flex flex-col font-poppins gap-[50px] items-center mx-auto pt-2.5 w-[100%] h-full"
    >
      <Topbar
        className="flex flex-row items-center justify-between px-2.5 w-full"
        user={false}
      />
      <div className="flex flex-col gap-40 items-start justify-start w-full">
        <StoreDetailsBar
          className="bg-red_300 opacity-[55%] flex flex-col gap-7 items-start justify-start p-30 pb-5 pt-5 pl-10 sm:px-5 w-full"
          store={advert.store}
        />

        <ProductOverviewSection
          className="flex items-start justify-start pl-10"
          advert={advert}
          userid={props?.userid}
        />
      </div>

      <div className="flex flex-col gap-20 items-start justify-start w-full">
        {owner && (
          <div className="items-center justify-center p-10 w-full">
            <Text className="text-black_900_dd uppercase" as="h1" variant="h1">
              Offers
            </Text>
            {openOffers.length > 0 && (
              <OfferSection status={OfferStatus.OPEN} offers={openOffers} />
            )}
            {acceptedOffers.length > 0 && (
              <OfferSection
                status={OfferStatus.ACCEPTED}
                offers={acceptedOffers}
              />
            )}
            {rejectedOffers.length > 0 && (
              <OfferSection
                status={OfferStatus.REJECTED}
                offers={rejectedOffers}
              />
            )}
            {canceledOffers.length > 0 && (
              <OfferSection
                status={OfferStatus.CANCELED}
                offers={canceledOffers}
              />
            )}
          </div>
        )}
        <div className="items-center justify-center p-10 w-full">
          <Text className="text-black_900_dd uppercase" as="h1" variant="h1">
            Reviews
          </Text>
          <List
            className="font-poppins gap-[20%] grid items-center mt-[37px] w-[100%]"
            orientation="vertical"
          >
            {advert.reviews.map((props, index) => (
              <React.Fragment key={`ProductOverviewViewerReviewbar${index}`}>
                <Reviewbar
                  className="border border-gray_500 border-solid rounded-[15px] flex flex-col justify-start w-[100%]"
                  {...props}
                />
              </React.Fragment>
            ))}
          </List>
        </div>
      </div>

      <Bottombar />
    </div>
  );
};

export default ProductOverview;
