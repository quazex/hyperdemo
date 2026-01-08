import { ValidateUUID } from '@hyperdemo/decorators'

export class CategoriesPrimaryReq {
  @ValidateUUID()
  public category_id: string
}
