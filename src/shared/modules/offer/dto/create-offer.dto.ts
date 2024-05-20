import { OfferType } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: string;
  public image: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: OfferType;
  public roomNumber: number;
  public guestsNumber: number;
  public price: number;
  public features: string[];
  public author: string;
  public commentsNumber: number;
  public coordinates: string[];
}
