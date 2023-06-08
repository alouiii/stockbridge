import { Page } from "../components/Page";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import "../styles/userInfo.css"
import { palette } from "../utils/colors";

import useMediaQuery from "./../hooks/useMediaQuery";
import { useState, ReactElement } from "react";

import questionIcon from "./../assets/question-circle.svg";
import premiumIcon from "./../assets/bookmark-star.svg";
import storeIcon from "./../assets/shop.svg";
import buyingIcon from "./../assets/box-seam.svg";
import advertIcon from "./../assets/cash-stack.svg";
import sellingIcon from "./../assets/cash-coin.svg";
import { LeftTab } from "../components/Profile/LeftTab";
import MyAdvertsContent from "../components/Profile/MyAdvertsContent";
import SellingContent from "../components/Profile/SellingContent";
import BuyingContent from "../components/Profile/BuyingContent";
import StoreDetailsContent from "../components/Profile/StoreDetailsContent";
import PremiumContent from "../components/Profile/PremiumContent";
import HelpQaContent from "../components/Profile/HelpQaContent";






// Contains the tabs displayed on the sidebar of the profile page and their corresponding content
const leftTabs: { text: string; icon: any, content: ReactElement, isSelected: boolean }[] = [
  {
    text: "My Adverts",
    icon: advertIcon,
    content: <MyAdvertsContent children={[]} />,
    isSelected: false
  },
  {
    text: "Selling",
    icon: sellingIcon,
    content: <SellingContent children={[]} />,
    isSelected: true
  },
  {
    text: "Buying",
    icon: buyingIcon,
    content: <BuyingContent children={[]} />,
    isSelected: false
  },
  {
    text: "Store Details",
    icon: storeIcon,
    content: <StoreDetailsContent children={[]} />,
    isSelected: false
  },
  {
    text: "Premium",
    icon: premiumIcon,
    content: <PremiumContent children={[]} />,
    isSelected: false
  },
  {
    text: "Help and FAQ",
    icon: questionIcon,
    content: <HelpQaContent children={[]} />,
    isSelected: false
  },
];



export function UserInfo() {
  const matches = useMediaQuery("(min-width: 768px)");
  const [selectedProfileSection, setSelectedProfileSection] = useState(0);


  return (
    <Page>
      <ProfileHeader />

      <div className="row">
        <div className="col-2 profile-section-container"
          style={{
            left: 0,
            minHeight: "100em",
            height: "100%",
            backgroundColor: palette.subSectionsBgLighter,
            alignItems: "center",
            display: matches ? "flex" : "none",
            flexDirection: "column",
          }}>


          <div className="sections-container"
            style={{
              marginTop: "40%",
              //display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {leftTabs.map((section, sectionIndex) => {
              return (
                <LeftTab
                  title={section.text}
                  icon={section.icon}
                  index={sectionIndex}
                  selectedTab={selectedProfileSection}
                  setSelectedTab={setSelectedProfileSection}
                />
              );
            })}
          </div>
        </div>

        <div className="col-10" style={{ paddingTop: "5em" }}>
          {leftTabs[selectedProfileSection].content}

        </div>

      </div>
    </Page>
  );
}
