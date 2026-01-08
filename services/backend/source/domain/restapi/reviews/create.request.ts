import { ValidateNumber, ValidateString } from '@hyperdemo/decorators'

export class ReviewsCreateReq {
  @ValidateString({ example: 'Feedback text' })
  public text: string

  @ValidateNumber({ minimum: 1, maximum: 5, example: 3 })
  public rating: number
}
