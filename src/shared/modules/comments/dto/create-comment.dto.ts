
export class CreateCommentDto {
  public text: string;
  public postDate: Date;
  public rate: number;
  public userId!: string;
  public offerId!: string;
}
