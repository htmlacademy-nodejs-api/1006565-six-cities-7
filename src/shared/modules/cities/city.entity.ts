import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop
} from '@typegoose/typegoose';

import { City } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface Cityntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'features',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CityEntity extends defaultClasses.TimeStamps implements City {
  @prop({required: true, trim: true})
  public name!: string;

  @prop({required: true, trim: true})
  public coordinates!: string[];
}

export const CityModel = getModelForClass(CityEntity);
