import { DocumentType } from '@typegoose/typegoose';

import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByText(email: string): Promise<DocumentType<CommentEntity> | null>;
  findOrCreate(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
}
