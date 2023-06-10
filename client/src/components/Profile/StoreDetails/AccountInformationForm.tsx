import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { Title } from "../../Text/Title";
import { AccountInformationFormProps } from "./StoreDetailsForm";

const AccountInformationForm = (props: AccountInformationFormProps) => {
  return (
    <>
      <Title style={{}}>
        <h2>Account Information</h2>
      </Title>
      <FloatingLabel className="mb-3" controlId="email" label="Email Address">
        <Form.Control
          type="email"
          value={props.email.value}
          onChange={props.email.onChange}
          autoComplete="username"
        />
      </FloatingLabel>

      <FloatingLabel className="mb-3" controlId="password" label="Password">
        <Form.Control
          type="password"
          value={props.password.value}
          onChange={props.password.onChange}
          autoComplete="current-password"
        />
      </FloatingLabel>

      <FloatingLabel className="mb-3" controlId="phone" label="Phone Number">
        <Form.Control
          type="tel"
          value={props.phone.value}
          onChange={props.phone.onChange}
        />
      </FloatingLabel>
    </>
  );
};

export default AccountInformationForm;
