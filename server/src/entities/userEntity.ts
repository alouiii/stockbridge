export type status =
  | 'active'
  | 'past_due'
  | 'unpaid'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired';

export interface Address {
  street: string;
  houseNumber: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Subscription {
  from: Date;
  to: Date;
  status: status;
  type: 'Basic Subscription' | 'Advanced Subscription' | 'Premium Subscription';
}

export interface PaymentMethod {
  name: string;
  cardNumber: string;
  expirationDate: Date;
  cvv: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  prioritisationTickets: number;
  phoneNumber: string;
  createdAt: Date;
  address: Address;
  subscription: Subscription;
  paymentMethod: PaymentMethod;
  rating: number;
  stripeCustomerId: string;

  getSignedJwtToken(): string;

  matchPassword(enteredPassword: string): boolean;
}
