import { IsUUID } from '@hyperdemo/validators'

export class ReviewsPrimaryReq {
  @IsUUID()
  public product_id: string
}
