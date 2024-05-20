import { OfferType } from './offer-type.enum.js';
import { Feature } from './feature.type.js';
import { User } from './user.type.js';


export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  image: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  roomNumber: number;
  guestsNumber: number;
  price: number;
  features: Feature[];
  author: User;
  commentsNumber: number;
  coordinates: string[];
};
