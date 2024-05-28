import { DocumentType } from '@typegoose/typegoose';

import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByText(text: string): Promise<DocumentType<CommentEntity> | null>;
  deleteByOfferId(offerId: string): Promise<number>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
}
