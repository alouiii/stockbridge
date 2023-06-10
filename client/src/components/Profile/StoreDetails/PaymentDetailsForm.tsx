import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Title } from "../../Text/Title";
import { PaymentDetailsFormProps } from "./StoreDetailsForm";

const PaymentDetailsForm = (props: PaymentDetailsFormProps) => {
  return (
    <>
      {/*<Form onSubmit={handleSubmit}>*/}
      <Title style={{}}>
        <h2>Payment Details</h2>
      </Title>
      <Form.Floating className="mb-3">
        <Form.Control
          type="text"
          id="cardHolder"
          placeholder="Card Holder"
          value={props.cardHolder.value}
          onChange={props.cardHolder.onChange}
        />
        <label htmlFor="cardHolder">Card Holder</label>
      </Form.Floating>
      <Form.Floating className="mb-3">
        <Form.Control
          type="text"
          id="cardNumber"
          placeholder="Card Number"
          value={props.cardNumber.value}
          onChange={props.cardNumber.onChange}
        />
        <label htmlFor="cardNumber">Card Number</label>
      </Form.Floating>
      <Row className="mb-3">
        <Col>
          <Form.Floating>
            <Form.Control
              type="text"
              id="ccv"
              placeholder="CCV"
              value={props.ccv.value}
              onChange={props.ccv.onChange}
            />
            <label htmlFor="ccv">CCV</label>
          </Form.Floating>
        </Col>
        <Col>
          <Form.Floating>
            <Form.Control
              type="text"
              id="expiration"
              placeholder="Expiration Date"
              value={props.expiration.value}
              onChange={props.expiration.onChange}
            />
            <label htmlFor="expiration">Expiration Date</label>
          </Form.Floating>
        </Col>
      </Row>
      {/*<Row className={'mb-2 justify-content-end '}>*/}
      {/*    <Col xs={1}>*/}
      {/*        <Button type="submit" className={'mb-2'}*/}
      {/*                style={{*/}
      {/*                    width: "100%",*/}
      {/*                    border: "none",*/}
      {/*                    backgroundColor: palette.subSectionsBgAccent,*/}
      {/*                    borderRadius: 30,*/}
      {/*                }}*/}
      {/*        >*/}
      {/*            Save*/}
      {/*        </Button>*/}
      {/*    </Col>*/}
      {/*</Row>*/}
      {/*</Form>*/}
    </>
  );
};

export default PaymentDetailsForm;
