import React, { ReactElement, useState } from 'react';
import Card from '../Premium/Card';
import { Container, Row } from 'react-bootstrap';
import PaymentElement from '../../Payment/PaymentElement';

type Props = {
  children: ReactElement[];
};

const prioTickets = [
  {
    header: 'Basic Pack',
    price: 5,
    features: ['5 Tickets'],
    buttonLabel: 'Purchase',
    outline: false,
  },
  {
    header: 'Advanced Pack',
    price: 10,
    features: ['10 Tickets'],
    buttonLabel: 'Purchase',
    outline: false,
  },
  {
    header: 'Premium Pack',
    price: 15,
    features: ['20 Tickets'],
    buttonLabel: 'Purchase',
    outline: false,
  },
];

const subscriptionPlans = [
  {
    header: 'Basic Subscription',
    price: 10,
    features: ['10 Adverts/Week', '3 Priority Adverts/Week', '24/7 Support'],
    buttonLabel: 'Purchase',
    outline: false,
  },
  {
    header: 'Advanced Subscription',
    price: 15,
    features: ['15 Adverts/Week', '5 Priority Adverts/Week', '24/7 Support'],
    buttonLabel: 'Purchase',
    outline: false,
  },
  {
    header: 'Premium Subscription',
    price: 30,
    features: [
      'Unlimited Adverts/Week',
      '10 Priority Adverts/Week',
      '24/7 Support',
    ],
    buttonLabel: 'Purchase',
    outline: false,
  },
];

const PremiumContent: React.FC<Props> = () => {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [product, setProduct] = useState('');

  const plans = subscriptionPlans.map((obj, i) => {
    return (
      <Card
        key={obj.header}
        header={obj.header}
        price={obj.price}
        features={obj.features}
        buttonLabel={obj.buttonLabel}
        outline={obj.outline}
        buttonOnClick={(amount: number, product: string) => () => {
          setShowModal(true);
          setAmount(amount);
          setProduct(product);
        }}
      />
    );
  });

  const tickets = prioTickets.map((obj, i) => {
    return (
      <Card
        key={obj.header}
        header={obj.header}
        price={obj.price}
        features={obj.features}
        buttonLabel={obj.buttonLabel}
        outline={obj.outline}
        buttonOnClick={(amount: number, product: string) => () => {
          setShowModal(true);
          setAmount(amount);
          setProduct(product);
        }}
      />
    );
  });

  return (
    <>
      <Container fluid className="py-2 overflow-hidden ">
        <Row className="mb-5 justify-content-center text-center">
          <h2> Subscription Plans </h2>
        </Row>
        <Row className="d-flex flex-row flex-nowrap overflow-auto justify-content-center">
          {plans}
        </Row>
        <Row className="my-5 justify-content-center text-center">
          <h2> Prioritization Tickets </h2>
        </Row>
        <Row className="d-flex flex-row flex-nowrap overflow-auto justify-content-center">
          {tickets}
        </Row>
      </Container>
      {amount > 0 && product && (
        <PaymentElement
          amount={amount * 100}
          show={showModal}
          onHide={() => setShowModal(false)}
          product={product}
          type={
            product.toLowerCase().includes('subscription')
              ? 'subscription'
              : 'paymentIntent'
          }
        />
      )}
    </>
  );
};

export default PremiumContent;
