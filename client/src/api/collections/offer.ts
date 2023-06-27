import { ApiClient } from '../apiClient';
import { User } from './user';

export enum OfferStatus {
  OPEN = 'Open',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  CANCELED = 'Canceled',
}

export interface Offer {
  _id?: string;
  price?: number;
  quantity?: number;
  status?: OfferStatus;
  message?: string;
  createdAt?: Date;
  offeror?: string;
  offeree?: string;
  advert?: string;
}

const apiClient = new ApiClient();

export async function getOffer(id: string): Promise<Offer> {
  return await apiClient.get<Offer>(`/offers/${id}`, {
    withCredentials: true,
  });
}

export async function createOffer(offer: Offer): Promise<Offer> {
  return await apiClient.post<Offer>(`/offers/`, offer, {
    withCredentials: true,
  });
}

export async function updateOffer(id: string, offer: Offer): Promise<Offer> {
  return await apiClient.put<Offer>(`/offers/${id}`, offer, {
    withCredentials: true,
  });
}

export async function deleteOffer(id: string): Promise<void> {
  return await apiClient.delete<void>(`/offers/${id}`, {
    withCredentials: true,
  });
}

export async function getOffersByAdvert(advert: string): Promise<Offer[]> {
  return await apiClient.get<Offer[]>(`/offers/getOffersByAdvert/${advert}`, {
    withCredentials: true,
  });
}

/**
 * Returns offers filtered by the given parameters
 * @param user the user Id
 * @param advertType 'Ask' or 'Sell'
 * @param offerType 'outgoing' or 'incoming'
 * @returns 
 */
export async function getUserSpecificOffers(user: string, advertType: string, offerType: string): Promise<Offer[]> {
  console.debug(user,advertType,offerType);
  return await apiClient.get<Offer[]>(
    `/offers/getUserSpecificOffers/1234`, 
    {withCredentials: true},
    {'user': user, 'advertType': advertType, 'offerType': offerType}
    );
}
