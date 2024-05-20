import { Comment } from '../../types/index.js';
import {
  prop,
  getModelForClass,
  defaultClasses,
  modelOptions,
  Ref,
} from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { OfferEntity } from '../offer/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity
  extends defaultClasses.TimeStamps
  implements Comment {
  @prop({ required: true, message: 'Text is required' })
  public text: string;

  @prop({ required: true, message: 'Date has incorrect format', default: '' })
  public postDate: Date;

  @prop({
    required: true,
    minlength: 1,
    maxlength: 5,
    message: 'Rate is required',
    default: '',
  })
  public rate: number;

  @prop({ ref: UserEntity, required: true })
  public userId!: Ref<UserEntity>;

  @prop({ ref: OfferEntity, required: true })
  public offerId!: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
