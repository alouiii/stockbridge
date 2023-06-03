import React from "react";
import "./styles/color.css";
import "./styles/font.css";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import "./styles/tailwind.css";

export enum StoreCategory {
  FLOWERS = "FLOWERS",
}
export type Review = {
  storename: string;
  date: string;
  review: string;
  rating: number;
};

export type Store = {
  id: string;
  storename: string;
  rating: number;
  category: StoreCategory;
};

export enum OfferStatus {
  OPEN = "Open",
  ACCEPTED = "Accepted",
  REJECTED = "Rejected",
  CANCELED = "Canceled",
}

export type Offer = {
  status: OfferStatus;
  store: Store;
  quantity: number;
  price: number;
  date: Date;
};
export type Advert = {
  id: number;
  productname: string;
  description: string;
  imageurl: string;
  category: string;
  reference: string;
  price: number;
  quantity: number;
  type: string;
  color: string;
  purchaseDate: Date;
  reviews: Review[];
  offers: Offer[];
  issuer: string;
  prioritized?: boolean;
};
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

export const adverts: Advert[] = [
  {
    id: 12,
    price: 12,
    category: "Flowers",
    quantity: 10,
    productname: "Orchids",
    type: "Sell",
    description:
      "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s,",
    color: "Blue",
    purchaseDate: new Date(2023, 4, 23),
    imageurl: "img_orchids1.png",
    reference: "X-6743FGXC",
    reviews: [
      {
        storename: "Store Name",
        rating: 4.5,
        review:
          "Great service, shipment arrived on time. totally recommend this store!",
        date: new Date(1023, 4, 23).toLocaleDateString(),
      },
    ],
    offers: [
      {
        status: OfferStatus.REJECTED,
        store: {
          id: "6474c7d7222db607692cb307",
          category: StoreCategory.FLOWERS,
          storename: "Offer Store",
          rating: 3,
        },
        quantity: 15,
        price: 3,
        date: new Date(2023, 5, 26),
      },
      {
        status: OfferStatus.OPEN,
        store: {
          id: "6474c7d7222db607692cb307",
          category: StoreCategory.FLOWERS,
          storename: "Offer Store",
          rating: 3,
        },
        quantity: 15,
        price: 3,
        date: new Date(2023, 5, 26),
      },
      {
        status: OfferStatus.ACCEPTED,
        store: {
          id: "6474c7d7222db607692cb307",
          category: StoreCategory.FLOWERS,
          storename: "Offer Store",
          rating: 3,
        },
        quantity: 15,
        price: 3,
        date: new Date(2023, 5, 26),
      },
      {
        status: OfferStatus.CANCELED,
        store: {
          id: "6474c7d7222db607692cb307",
          category: StoreCategory.FLOWERS,
          storename: "Offer Store",
          rating: 3,
        },
        quantity: 15,
        price: 3,
        date: new Date(2023, 5, 26),
      },
    ],
    issuer: "6474c7d7222db607692cb307",
 
  },
];
