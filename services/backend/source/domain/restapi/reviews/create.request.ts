import { IsNumber, IsString } from '@hyperdemo/validators';

export class ReviewsCreateReq {
    @IsString()
    public text: string;

    @IsNumber({ minimum: 1, maximum: 5 })
    public rating: number;
}
