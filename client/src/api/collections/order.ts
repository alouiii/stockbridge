import { Offer } from './offer';

export enum ORDER_STATUS {
  PAYMENT_PENDING,
  SHIPMENT_PENDING,
  RECEIVED,
}

export interface PopulatedOrder {
  _id: string;
  totalPrice: number;
  quantity: number;
  status: ORDER_STATUS;
  offer: Offer;
}

export interface Order {
  _id: string;
  totalPrice: number;
  quantity: number;
  status: ORDER_STATUS;
  offer: string;
}
