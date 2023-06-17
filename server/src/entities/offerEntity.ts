import { Advert } from './advertEntity';
import { User } from './userEntity';

export enum OfferStatus {
  OPEN = 'Open',
  ACCEPTED = 'Accepted',
  REJECTED = 'REJECTED',
  CANCELED = 'Canceled',
}

export interface Offer {
  id: string;
  price: number;
  quantity: number;
  status: OfferStatus;
  message?: string;
  createdAt: Date;
  offeror: User;
  offeree: User;
  advert: Advert;
}
