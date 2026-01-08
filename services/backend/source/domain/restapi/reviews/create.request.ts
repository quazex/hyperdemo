import { IsNumber, IsString } from '@hyperdemo/validators'

export class ReviewsCreateReq {
  @IsString({ example: 'Feedback text' })
  public text: string

  @IsNumber({ minimum: 1, maximum: 5, example: 3 })
  public rating: number
}
