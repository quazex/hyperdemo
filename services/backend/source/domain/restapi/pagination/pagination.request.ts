import { ValidateNumber } from '@hyperdemo/decorators'

export class PaginationReq {
  @ValidateNumber({ minimum: 1, example: 1 })
  public page: number
}
