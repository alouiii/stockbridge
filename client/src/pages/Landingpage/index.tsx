import React, { useState } from "react";

import { Text, Bottombar, Topbar, Button } from "components";
import HomepageHelp from "components/Help";
import HomepageIntrobar from "components/Introbar";
import HomepageStackpostYourAdvert from "components/HomepageStackpostYourAdvert";
import { useNavigate } from "react-router-dom";

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray_50_02 flex flex-col font-poppins items-center justify-end mx-auto pt-[9px] w-full">
        <Topbar
          className="flex flex-row items-center justify-between px-2.5 w-full"
          user={false}
        />
        <HomepageStackpostYourAdvert
          className="font-poppins h-[789px] mt-3 md:px-5 relative w-full"
          loggedin={true}
        />
        <HomepageIntrobar
          className="bg-red_300_4c flex flex-col font-poppins gap-[60px] h-[443px] md:h-auto items-center justify-center px-0 md:px-10 sm:px-5 py-[25px] w-full"
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
        <div className="flex flex-col gap-5">
          <Button
            onClick={() =>
              navigate("/productoverview/")
            }
          >
            Article to buy
          </Button>
          <Button>Article Prioritized</Button>
          <Button>Article To prioritize</Button>
        </div>
        <HomepageHelp
          className="flex flex-col gap-5 items-center justify-center max-w-[1032px] mt-[3046px] mx-auto md:px-5 w-full"
          gotanyquestionsOne="Got any questions? Need help?"
          weareheretohelpOne="We are here to help. Get in touch!"
        />
        <div className="flex flex-col font-poppins items-center justify-center max-w-[1512px] mt-[99px] w-full">
          <Bottombar
            className="bg-red_300_4c flex flex-col h-[209px] md:h-auto items-center justify-center min-w-[100%] w-full"
            yourwebsite2023One="© Your Website 2023"
            terms="Terms"
            privacy="Privacy"
            languageOptions={[
              { label: "English", value: "English" },
              { label: "German", value: "German" },
            ]}
            iconsmadebyfreeOne="Icons made by Freepik from www.flaticon.com is licensed by CC 3.0 BY"
          />
        </div>
      </div>
    </>
  );
};

export default Homepage;
