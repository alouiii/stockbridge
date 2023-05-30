import { User } from "./userEntity";

export interface Advert {
  id: string;
  productname: string;
  description: string;
  imageurl: string;
  prioritized?: boolean;
  color: string;
  expirationDate: Date;
  quantity: number;
  price: number;
  date: Date;
  status: string;
  type: string;
  category: string;
  offers: Offer[];
  reviews: Review[];
  store: User;
}

export interface Review {
  id: string;
  rating: number;
  reviewMessage: string;
  date: Date;
  issuer: User;
}

export interface Offer {
  id: string;
  status: string;
  quantity: number;
  price: number;
  message: string;
  date: Date;
  issuer: User;
}
