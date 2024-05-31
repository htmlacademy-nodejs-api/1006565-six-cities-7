import { inject } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { CityService } from './city-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CityEntity } from './city.entity.js';
import { CreateCityDto } from './dto/create-city.dto.js';
import { MAX_CITIES_COUNT } from './city.constant.js';


export class DefaultCityService implements CityService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CityModel) private readonly cityModel: types.ModelType<CityEntity>
  ) {}

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const result = await this.cityModel.create(dto);
    this.logger.info(`New city created: ${dto.name}`);
    return result;
  }

  public async findByCityId(cityId: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findById(cityId).exec();
  }

  public async findByCityName(cityName: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({name: cityName}).exec();
  }

  public async findByCityNameOrCreate(cityName: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const existedCity = await this.findByCityName(cityName);

    if (existedCity) {
      return existedCity;
    }

    return this.create(dto);
  }

  public async find(): Promise<DocumentType<CityEntity>[]> {
    return this.cityModel
      .aggregate([
        {
          $lookup: {
            from: 'offers',
            let: { cityId: '$_id'},
            pipeline: [
              { $match: { $expr: { $in: ['$$cityId', '$cities'] } } },
              { $project: { _id: 1}}
            ],
            as: 'offers'
          },
        },
        { $addFields:
          { id: { $toString: '$_id'}, offerCount: { $size: '$offers'} }
        },
        { $unset: 'offers' },
        { $limit: MAX_CITIES_COUNT },
        { $sort: { offerCount: SortType.Down } }
      ]).exec();
  }
}
