import { ApiClient } from '../apiClient';
import { Advert } from './advert';
import { User } from './user';

export interface Review {
  _id: string;
  rating: number;
  description: string;
  createdAt: Date;
  reviewer: string;
  reviewedAdvert: string;
}

const apiClient = new ApiClient();

export async function getReview(id: string): Promise<Review> {
  return await apiClient.get<Review>(`/reviews/${id}`);
}

export async function createReview(review: Review): Promise<Review> {
  return await apiClient.post<Review>(`/reviews/`, review, {
    withCredentials: true,
  });
}

export async function updateReview(
  id: string,
  review: Review,
): Promise<Review> {
  return await apiClient.put<Review>(`/reviews/${id}`, review, {
    withCredentials: true,
  });
}

export async function deleteReview(id: string): Promise<void> {
  return await apiClient.delete<void>(`/reviews/${id}`,{
    withCredentials: true,
  });
}

export async function getAllReviews(): Promise<Review[]> {
  return await apiClient.get<Review[]>(`/reviews/`, {
    withCredentials: true,
  });
}

export async function getReviewsByAdvert(advertId: string): Promise<Review[]> {
  return await apiClient.get<Review[]>(
    `/reviews/getReviewsByAdvert/${advertId}`, {
      withCredentials: true
    }
  );
}
