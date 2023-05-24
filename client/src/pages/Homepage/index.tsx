import React from "react";

import { Text } from "components";
import HomepageBottombar from "components/HomepageBottombar";
import HomepageHelp from "components/HomepageHelp";
import HomepageIntrobar from "components/HomepageIntrobar";
import HomepageStackpostYourAdvert from "components/HomepageStackpostYourAdvert";
import HomepageTopbar from "components/HomepageTopbar";

const HomepagePage: React.FC = () => {
  return (
    <>
      <div className="bg-gray_50 flex flex-col font-roboto items-center justify-end mx-auto pt-[9px] w-full">
        <HomepageTopbar className="flex flex-row items-center justify-between px-2.5 w-full" />
        <HomepageStackpostYourAdvert
          className="font-poppins h-[789px] mt-3 md:px-5 relative w-full"
          postYourAdvert="Post your advert"
          or="OR"
          language={
            <>
              Out of stock? or got
              <br />
              too much stock?
              <br />
              No worries!{" "}
            </>
          }
        />
        <HomepageIntrobar
          className="bg-red_300_4c flex flex-col font-roboto gap-[60px] h-[443px] md:h-auto items-center justify-center md:px-10 sm:px-5 px-[60px] py-[25px] w-full"
          howitworks="How it works"
          one="1."
          searchforwhat="Search for what you are looking for."
          two="2."
          findtheitemyou={
            <>
              Find the item you are looking for
              <br />
              in the search results.
            </>
          }
          three="3."
          makeanofferto="Make an offer to the seller!"
        />
        <Text
          className="mt-[104px] text-black_900 text-center uppercase"
          as="h1"
          variant="h1"
        >
          inventory management
        </Text>
        <HomepageHelp
          className="flex flex-col gap-5 items-center justify-center max-w-[1032px] mt-[3046px] mx-auto md:px-5 w-full"
          gotanyquestionsOne="Got any questions? Need help?"
          weareheretohelpOne="We are here to help. Get in touch!"
        />
        <HomepageBottombar
          className="bg-red_300_4c flex flex-col font-worksans items-center justify-center mt-[99px] w-full"
          yourwebsite2023One="© Your Website 2023"
          legal="Legal"
          terms="Terms"
          privacy="Privacy"
          languageOne="Language"
          iconsmadebyfreeOne="Icons made by Freepik from www.flaticon.com is licensed by CC 3.0 BY"
        />
      </div>
    </>
  );
};

export default HomepagePage;
