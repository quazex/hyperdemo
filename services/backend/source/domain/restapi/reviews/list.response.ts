import { ReviewsListModel } from '@domain/models';
import { TReviewsListSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { Type, plainToInstance } from 'class-transformer';
import { ReviewsDataRes } from './data.response';

export class ReviewsListRes implements TReviewsListSchema {
    @ApiProperty({ minimum: 0 })
    public total: number;

    @ApiProperty({ minimum: 0 })
    public pages: number;

    @ApiProperty({ type: [ReviewsDataRes] })
    @Type(() => ReviewsDataRes)
    public rows: ReviewsDataRes[];

    public static init(model: ReviewsListModel): ReviewsListRes {
        const schema = model.toSchema();
        return plainToInstance(ReviewsListRes, schema);
    }
}
