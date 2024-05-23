import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>

  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = new CommentEntity(); // new CommentEntity(dto)

    const result = await this.commentModel.create(comment);
    this.logger.info(`New comment created: ${dto.text}`);

    return result;
  }

  public async findByText(text: string): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel.findOne({text});
  }

  public async findOrCreate(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const existedComment = await this.findByText(dto.text);

    if (existedComment) {
      return existedComment;
    }

    return this.create(dto);
  }
}
