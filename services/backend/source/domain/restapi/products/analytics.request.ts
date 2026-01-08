import { ValidateDateTime } from '@hyperdemo/decorators'
import { DateTime } from 'luxon'

export class ProductsAnalyticsReq {
  @ValidateDateTime({ example: '2024-07-01T00:00:00Z' })
  public date_from: DateTime

  @ValidateDateTime({ example: '2024-07-31T23:59:59Z' })
  public date_to: DateTime
}
