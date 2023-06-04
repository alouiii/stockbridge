import React from "react";

import {Page} from "../components/Page";
import {ProfileHeader} from "../components/Profile/ProfileHeader";
import {ProfileSections} from "../components/Profile/ProfileSections";
import "../styles/userInfo.css"
import {palette} from "../utils/colors";
import {Col, Container, Row} from "react-bootstrap";
import StoreDetailsForm from "../components/Profile/StoreDetails/StoreDetailsForm";


export function UserInfo() {
    return (
        <Page>
            <ProfileHeader/>

            <Container className={'m-0'} fluid >

                <Row>

                    <Col xs={2}
                         style={{
                             //position: "absolute",
                             left: 0,
                             height: "100%",
                             backgroundColor: palette.subSectionsBgLighter,
                             alignItems: "center",
                             //display: matches ? "flex" : "none",
                             //flexDirection: "column",
                         }}
                    >

                        {/* <ProfileSections leftTabs= {leftTabs as ProfileSectionsProps}/> */}
                        <ProfileSections/>

                    </Col>

                    <Col xs={10} className={'p-4'}>
                        {/*<Tabs>*/}
                        {/*  <Tab title="Orders">Ciao bella, this is the container for the Orders</Tab>*/}
                        {/*  <Tab title="Incoming Offers">Hola guys, this is the container for the incoming offers</Tab>*/}
                        {/*  <Tab title="Outgoing Offers">Servus amigos, this is the container for the outgoing offers</Tab>*/}
                        {/*</Tabs>*/}
                        {/*<StoreDetailsHeader name={'Petals & Blooms'} image={flowerShop} joined={new Date()}/>*/}

                        <StoreDetailsForm />


                    </Col>

                </Row>
            </Container>
        </Page>
    );
}
