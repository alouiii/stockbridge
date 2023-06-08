import {ApiClient} from "../apiClient";

export interface Address {
    street?: string;
    houseNumber?: string;
    city?: string;
    postalCode?: string;
    country?: string;
}

export interface Subscription {
    from?: Date;
    to?: Date;
    renew?: boolean;
}

export interface PaymentMethod {
    name?: string;
    cardNumber?: string;
    expirationDate?: Date;
    cvv?: string;
}

export interface User {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    prioritisationTickets?: number;
    phoneNumber?: string;
    createdAt?: Date;
    address?: Address;
    subscription?: Subscription;
    paymentMethod?: PaymentMethod;
}


const apiClient = new ApiClient();

export async function getUser(id: string): Promise<User> {
    return await apiClient.get<User>(`/users/${id}`);
}

export async function updateUser(id: string, user: User): Promise<User>{
    return await apiClient.put<User>(`/users/${id}`, user, {withCredentials: true});
}

export async function deleteUser(id: string): Promise<void> {
    return await apiClient.delete<void>(`/users/${id}`);
}


