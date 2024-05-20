import { Ref } from '@typegoose/typegoose';
import { UserEntity } from '../../shared/modules/user/index.js';
import { OfferEntity } from '../../shared/modules/offer/index.js';

export type Comment = {
  text: string,
  postDate: Date,
  rate: number,
  userId: Ref<UserEntity>,
  offerId: Ref<OfferEntity>,
};
