import logger from '../config/logger';
import { User } from '../entities/userEntity';
import environment from '../utils/environment';
import Stripe from 'stripe';
import { AppError } from '../utils/errorHandler';
import {
  handleSubscription,
  handleSuccessfulPaymentIntent,
} from './userServices';

const serviceName = 'stripeService';
const stripe = new Stripe(environment.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
  typescript: true,
});

export const createStripeCustomer = async (user: User) => {
  logger.debug(`${serviceName}: Creating stripe customer for ${user.email}`);
  return await stripe.customers.create({
    email: user.email,
    name: user.name,
    phone: user.phoneNumber,
    metadata: {
      userId: user.id,
    },
  });
};

export const createStripePaymentIntent = async (
  user: User,
  amount: number,
  product: string,
  config?: any,
) => {
  logger.debug(
    `${serviceName}: Creating stripe payment intent for ${user.email}`,
  );
  const customer = (await stripe.customers.retrieve(
    user.stripeCustomerId,
  )) as Stripe.Customer;
  return await stripe.paymentIntents.create({
    amount,
    currency: 'eur',
    customer: user.stripeCustomerId,
    automatic_payment_methods: {
      enabled: true,
    },
    // payment_method: customer.default_source,
    metadata: {
      userId: user.id,
      product: product,
    },
    setup_future_usage: 'off_session',
    ...config,
  });
};

export const createStripeSetupIntent = async (user: User) => {
  logger.debug(
    `${serviceName}: Creating stripe setup intent for ${user.email}`,
  );
  return await stripe.setupIntents.create({
    customer: user.stripeCustomerId,
    metadata: {
      userId: user.id,
    },
    usage: 'off_session',
    payment_method_types: ['card'],
  });
};

//TODO: How to handle the subscription edit
export const createStripeSubscription = async (
  user: User,
  subscriptionType: string,
) => {
  logger.debug(
    `${serviceName}: Creating stripe subscription for ${user.email}`,
  );
  let priceId;
  switch (subscriptionType) {
    case 'Basic Subscription':
      priceId = 'price_1NKhLmHGv7rRxdJfB2dX1yVK';
      break;
    case 'Advanced Subscription':
      priceId = 'price_1NKhMdHGv7rRxdJfiEeuXc1F';
      break;
    case 'Premium Subscription':
      priceId = 'price_1NKhMwHGv7rRxdJf7PgR5sKa';
      break;
    default:
      throw new AppError('Invalid subscription', 'Invalid subscription', 400);
  }
  const customer = (await stripe.customers.retrieve(user.stripeCustomerId, {
    expand: ['subscriptions'],
  })) as Stripe.Customer;
  if (customer.subscriptions && customer.subscriptions.data.length > 0) {
    throw new AppError(
      'User already has a subscription',
      'User already has a subscription',
      400,
    );
  }
  const subscription = await stripe.subscriptions.create({
    customer: user.stripeCustomerId,
    items: [
      {
        price: priceId,
      },
    ],
    metadata: {
      userId: user.id,
      product: subscriptionType,
    },
    payment_behavior: 'default_incomplete',
    collection_method: 'charge_automatically',
    expand: ['latest_invoice.payment_intent'],
  });
  const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
  let paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;
  paymentIntent = await stripe.paymentIntents.update(paymentIntent.id, {
    metadata: {
      userId: user.id,
      product: subscriptionType,
    },
  });

  return { subscription, paymentIntent };
};

export const cancelStripeSubscription = async (user: User) => {
  logger.debug(
    `${serviceName}: Canceling stripe subscription for ${user.email}`,
  );
  const customer = (await stripe.customers.retrieve(user.stripeCustomerId, {
    expand: ['subscriptions'],
  })) as Stripe.Customer;
  logger.debug('#################################');
  logger.debug(customer.subscriptions);
  if (
    !customer.subscriptions ||
    customer.subscriptions.data.length !== 1 ||
    !customer.subscriptions.data[0].id
  ) {
    throw new AppError(
      'User does not have a subscription',
      'User does not have a subscription',
      400,
    );
  }
  return await stripe.subscriptions.del(customer.subscriptions.data[0].id);
};

//TODO: Handle the event subscription.updated / subscription.deleted / subscription.created
export const webhookHandler = async (
  sig: string | string[],
  reqBody: Buffer,
) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      reqBody,
      sig,
      environment.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    logger.error(`${serviceName}: Webhook error: ${err}`);
    throw new AppError('Webhook error', 'Webhook error', 400);
  }
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      logger.debug(`${serviceName}: PaymentIntent was successful!`);
      await handleSuccessfulPaymentIntent(
        paymentIntent.metadata.userId,
        paymentIntent.metadata.product,
      );
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      logger.debug(`${serviceName}: PaymentMethod was attached to a Customer!`);
      break;
    // ... handle other event types
    case 'setup_intent.succeeded':
      logger.debug(`${serviceName}: SetupIntent was successful!`);
      const setupIntent = event.data.object as Stripe.SetupIntent;
      await stripe.customers.update(setupIntent.customer as string, {
        invoice_settings: {
          default_payment_method: setupIntent.payment_method as string,
        },
      });
      break;
    case 'customer.subscription.updated':
      logger.debug(`${serviceName}: Subscription was updated!`);
    case 'customer.subscription.deleted':
      logger.debug(`${serviceName}: Subscription was deleted!`);
    case 'customer.subscription.created':
      logger.debug(`${serviceName}: Subscription was created!`);
      const subscription = event.data.object as Stripe.Subscription;
      if (
        subscription.metadata.product !== 'Basic Subscription' &&
        subscription.metadata.product !== 'Advanced Subscription' &&
        subscription.metadata.product !== 'Premium Subscription'
      ) {
        throw new AppError('Invalid subscription', 'Invalid subscription', 400);
      }
      await handleSubscription(
        subscription.metadata.userId,
        subscription.status,
        subscription.metadata.product,
        new Date(subscription.current_period_start),
        new Date(subscription.current_period_end),
      );

      break;
    default:
      logger.debug(`${serviceName}: Received ${event.type}`);
  }
  // Return a response to acknowledge receipt of the event
  return true;
};
