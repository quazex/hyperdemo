import { AuthGuard } from '@auth';
import { BrandsAnalyticsReq, BrandsAnalyticsRes, BrandsPrimaryReq } from '@domain/restapi';
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Query,
    UseGuards,
    Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BrandsAnalyticsService } from '../business/business.handler';

@ApiTags('Brands')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class BrandsAnalyticsController {
    constructor(private readonly brandsAnalyticsService: BrandsAnalyticsService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: BrandsAnalyticsRes,
        isArray: true,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('brands/:brand_id/analytics')
    public async getList(
        @Param() params: BrandsPrimaryReq,
        @Query() query: BrandsAnalyticsReq,
    ): Promise<BrandsAnalyticsRes[]> {
        const entities = await this.brandsAnalyticsService.getList({
            brand_id: params.brand_id,
            date_from: query.date_from,
            date_to: query.date_to,
        });
        return BrandsAnalyticsRes.init(entities);
    }
}
