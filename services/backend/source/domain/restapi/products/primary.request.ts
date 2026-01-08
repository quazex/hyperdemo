import { ValidateUUID } from '@hyperdemo/decorators'

export class ProductsPrimaryReq {
  @ValidateUUID()
  public product_id: string
}
