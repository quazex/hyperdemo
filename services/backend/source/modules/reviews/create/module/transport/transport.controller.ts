import { ReviewsCreateReq, ReviewsDataRes, ReviewsPrimaryReq } from '@domain/restapi';
import { ClerkGuard } from '@hyperdemo/clerk';
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewsCreateService } from '../business/business.handler';

@ApiTags('Reviews')
@ApiBearerAuth()
@UseGuards(ClerkGuard)
@Controller()
export class ReviewsCreateController {
    constructor(private readonly service: ReviewsCreateService) {}

    @ApiResponse({
        status: HttpStatus.CREATED,
        type: ReviewsDataRes,
        isArray: false,
    })
    @HttpCode(HttpStatus.CREATED)
    @Version('1')
    @Post('reviews/:product_id/create')
    public async create(
        @Param() params: ReviewsPrimaryReq,
        @Body() body: ReviewsCreateReq,
    ): Promise<void> {
        await this.service.create({
            product_id: params.product_id,
            text: body.text,
            rating: body.rating,
        });
    }
}
