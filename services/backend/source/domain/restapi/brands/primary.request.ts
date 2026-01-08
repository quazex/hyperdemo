import { IsUUID } from '@hyperdemo/validators'

export class BrandsPrimaryReq {
  @IsUUID()
  public brand_id: string
}
