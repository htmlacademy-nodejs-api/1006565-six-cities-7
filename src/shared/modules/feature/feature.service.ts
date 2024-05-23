import { inject } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { FeatureService } from './feature-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { FeatureEntity } from './feature.entity.js';
import { CreateFeatureDto } from './dto/create-feature.dto.js';

export class DefaultFeatureService implements FeatureService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.FeatureModel) private readonly featureModel: types.ModelType<FeatureEntity>
  ) {}

  public async create(dto: CreateFeatureDto): Promise<DocumentType<FeatureEntity>> {
    const result = await this.featureModel.create(dto);
    this.logger.info(`New feature created: ${dto.name}`);
    return result;
  }

  public async findByFeatureId(featureId: string): Promise<DocumentType<FeatureEntity> | null> {
    return this.featureModel.findById(featureId).exec();
  }

  public async findByFeatureName(featureName: string): Promise<DocumentType<FeatureEntity> | null> {
    return this.featureModel.findOne({name: featureName}).exec();
  }

  public async findByFeatureNameOrCreate(featureName: string, dto: CreateFeatureDto): Promise<DocumentType<FeatureEntity>> {
    const existedFeature = await this.findByFeatureName(featureName);

    if (existedFeature) {
      return existedFeature;
    }

    return this.create(dto);
  }
}
