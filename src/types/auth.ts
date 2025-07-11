import { ServiceRegion, ServiceType } from "./common";
import { EstimateOffer, EstimateRequest, Like, Review } from "./estimate";

export type Login = {
  email: string;
  password: string;
  role: string;
};

export type Signup = {
  name: string;
  email: string;
  phone?: string;
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
  imageUrl: string;
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
  nickname: string;
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
  rating: number;
  reviewCount: number;
  description: string;
  averageRating: number;
  confirmedCount: number;
  createdAt: Date;
  updatedAt: Date;
  serviceType: ServiceType[];
  serviceRegion: ServiceRegion[];
  likeCount: number;
  isLiked: boolean;
  likedCustomers?: Like[];
  reviews?: Review[];
  estimateOffers?: EstimateOffer[];
  user?: User;
  designatedRequests?: EstimateRequest[];
};
