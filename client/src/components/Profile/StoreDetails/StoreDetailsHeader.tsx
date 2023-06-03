import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {Title} from "../../Text/Title";
import {BodyText} from "../../Text/BodyText";

interface StoreDetailsProps {
    image: string;
    name: string;
    joined: Date;
}

const StoreDetailsHeader = (props: StoreDetailsProps) => {

    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };

    const formattedJoinDate = props.joined.toLocaleDateString(undefined, options);


    return (
        <Container className={'p-2 m-2'} fluid>
            <Row className="align-items-center">
                <Col xs={4}>
                    <Image src={props.image} alt={'Store Image'} roundedCircle
                           className={'p-2'}
                           style={{ width: '75%', height: undefined, objectFit: 'cover', aspectRatio:'1/1' }}
                           fluid />
                </Col>
                <Col xs={8}>
                    <Title style={{}} message={props.name} />
                    <BodyText style={{}} message={`Joined on ${formattedJoinDate}`} />
                </Col>

            </Row>
        </Container>
    );
};

export default StoreDetailsHeader;