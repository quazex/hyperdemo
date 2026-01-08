import { ValidateUUID } from '@hyperdemo/decorators'

export class OrdersPrimaryReq {
  @ValidateUUID()
  public order_id: string
}
