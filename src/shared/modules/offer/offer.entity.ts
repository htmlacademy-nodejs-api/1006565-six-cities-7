import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose';

import { OfferType } from '../../types/index.js';
import { FeatureEntity } from '../feature/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop()
  public city!: string;

  @prop()
  public image!: string;

  @prop()
  public photos!: string[];

  @prop()
  public isPremium!: boolean;

  @prop()
  public isFavorite!: boolean;

  @prop()
  public rate!: number;

  @prop({
    type: () => String,
    enum: OfferType
  })
  public type!: OfferType;

  @prop()
  public roomNumber!: number;

  @prop()
  public guestsNumber!: number;

  @prop()
  public price!: number;

  @prop({
    ref: FeatureEntity,
    required: true,
    default: [],
    _id: false
  })
  public features!: Ref<FeatureEntity>[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public author!: Ref<UserEntity>;

  @prop({default: 0})
  public commentCount!: number;

  @prop()
  public coordinates!: string[];

}

export const OfferModel = getModelForClass(OfferEntity);
