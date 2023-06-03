import Tab from "../components/ContentTabs/Tab";
import Tabs from "../components/ContentTabs/Tabs";
import { Page } from "../components/Page";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { ProfileSections, ProfileSectionsProps } from "../components/Profile/ProfileSections";
import "../styles/userInfo.css"
import { palette } from "../utils/colors";



export function UserInfo() {
  return (
    <Page>
      <ProfileHeader />

      <div className="row">
        
        <div className="col-2"
          style={{
            //position: "absolute",
            left: 0,
            height: "100%",
            backgroundColor: palette.subSectionsBgLighter,
            alignItems: "center",
            //display: matches ? "flex" : "none",
            //flexDirection: "column",
          }}>
          
          {/* <ProfileSections leftTabs= {leftTabs as ProfileSectionsProps}/> */}
          <ProfileSections />
         
        </div>

        <div className="col-10" style={{paddingTop: "5em"}}>
          <Tabs>
            <Tab title="Orders">Ciao bella, this is the container for the Orders</Tab>
            <Tab title="Incoming Offers">Hola guys, this is the container for the incoming offers</Tab>
            <Tab title="Outgoing Offers">Servus amigos, this is the container for the outgoing offers</Tab>
          </Tabs>

        </div>

      </div>
    </Page>
  );
}
