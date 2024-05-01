import { OfferType } from "./offer-type.enum.js";

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  image: string;
  photoes: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  roomNumber: number;
  guestsNumber: number;
  price: number;
  features: string[];
  author: string;
  commentsNumber: number;
  coordinates: string[];
};
