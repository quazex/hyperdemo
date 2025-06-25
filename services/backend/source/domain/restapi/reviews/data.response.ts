import { ReviewsDataModel } from '@domain/models';
import { TReviewsDataSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

export class ReviewsDataRes implements TReviewsDataSchema {
    @ApiProperty({ description: 'UUID v4' })
    public id: string;

    @ApiProperty({ description: 'UUID v4' })
    public user_id: string;

    public text: string;

    @ApiProperty({ minimum: 1, maximum: 5 })
    public rating: number;

    @ApiProperty({ description: 'RFC3399' })
    public created_at: string;

    public static init(model: ReviewsDataModel): ReviewsDataRes {
        const schema = model.toSchema();
        return plainToInstance(ReviewsDataRes, schema);
    }
}
