import { ValidateUUID } from '@hyperdemo/decorators'

export class BrandsPrimaryReq {
  @ValidateUUID()
  public brand_id: string
}
