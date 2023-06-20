import React, { useEffect, useState } from 'react';
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import {
  createPaymentIntent,
  createSetupIntent,
  createSubscription,
} from '../../api/collections/payment';
import { Elements } from '@stripe/react-stripe-js';
import PaymentModal from './PaymentModal';

const stripePromise = loadStripe(
  'pk_test_51NHlGhHGv7rRxdJfVV4bS3RR8WmrXfJVGPD7l4FWYdgIaOxeGSIFFDOtUiSSw8FYrHWgyy1VXTdPMThE0qttYumH00xBawo5RB',
);

interface PaymentElementProps {
  amount?: number;
  show: boolean;
  onHide: () => void;
  product?: string;
  type: 'paymentIntent' | 'setupIntent' | 'subscription';
}

const PaymentElement = (props: PaymentElementProps) => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    switch (props.type) {
      case 'paymentIntent':
        createPaymentIntent({
          amount: props.amount!,
          product: props.product!,
        }).then((res) => setClientSecret(res));
        break;
      case 'setupIntent':
        createSetupIntent().then((res) => setClientSecret(res));
        break;
      case 'subscription':
        createSubscription(props.product!)
          .then((res) => setClientSecret(res.clientSecret))
          .catch((err) => alert(err.response.data.message));
    }
  }, [props.amount, props.product, props.type]);

  const appearance: Appearance = {
    theme: 'stripe',
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };
  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentModal
            show={props.show}
            onHide={props.onHide}
            type={props.type}
          />
        </Elements>
      )}
    </>
  );
};

export default PaymentElement;
