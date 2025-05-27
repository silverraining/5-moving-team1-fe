import { ServiceRegion, ServiceType } from "./common";
import { EstimateOffer, EstimateRequest, Like, Review } from "./estimate";

export type Login = {
  email: string;
  password: string;
  userType: string;
};

export type Signup = {
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: string;
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
  id: String;
  userId: String;
  imageUrl: String;
  serviceType: ServiceType[];
  serviceRegion: ServiceRegion;
  createdAt: Date;
  updatedAt: Date;
  likes: Like[];
  reviews: Review[];
};

export type MoverProfile = {
  id: String;
  userId: String;
  nickname: String;
  imageUrl: String;
  experience: number;
  intro: String;
  description: String;
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
