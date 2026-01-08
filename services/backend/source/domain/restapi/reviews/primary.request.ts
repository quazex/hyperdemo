import { ValidateUUID } from '@hyperdemo/decorators'

export class ReviewsPrimaryReq {
  @ValidateUUID()
  public product_id: string
}
