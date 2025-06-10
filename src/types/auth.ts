import { ServiceRegion, ServiceType } from "./common";
import { EstimateOffer, EstimateRequest, Like, Review } from "./estimate";

export type Login = {
  email: string;
  password: string;
  role: string;
  provider: string;
};

export type Signup = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
};
export type Role = "CUSTOMER" | "MOVER";

export type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: Role;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  notifications: [];
  customerProfile: [];
  moverProfile: [];
};

export type CustomerProfile = {
  id: string;
  userId: string;
  imageUrl: string;
  serviceType: ServiceType[];
  serviceRegion: ServiceRegion;
  createdAt: Date;
  updatedAt: Date;
  likes: Like[];
  reviews: Review[];
};

export type MoverProfile = {
  id: string;
  userId: string;
  nickname: string;
  imageUrl: string;
  experience: number;
  intro: string;
  description: string;
  averageRating: number;
  confirmedCount: number;
  createdAt: Date;
  updatedAt: Date;
  serviceType: ServiceType[];
  serviceRegions: ServiceRegion[];
  likedCustomers?: Like[];
  reviews?: Review[];
  estimateOffers?: EstimateOffer[];
  user?: User;
  designatedRequests?: EstimateRequest[];
};
