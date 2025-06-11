import { CategoriesAnalyticsReq, CategoriesAnalyticsRes } from '@models/restapi';
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Query,
    Version,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesPrimaryParams } from '../../../shared/primary.params';
import { CategoriesAnalyticsService } from '../business/business.handler';

@ApiTags('Categories')
@Controller()
export class CategoriesAnalyticsController {
    constructor(private readonly service: CategoriesAnalyticsService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: CategoriesAnalyticsRes,
        isArray: true,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('categories/:category_id/analytics')
    public async getList(
        @Param() params: CategoriesPrimaryParams,
        @Query() query: CategoriesAnalyticsReq,
    ): Promise<CategoriesAnalyticsRes[]> {
        const entities = await this.service.getList({
            category_id: params.category_id,
            date_from: query.date_from,
            date_to: query.date_to,
        });
        return CategoriesAnalyticsRes.init(entities);
    }
}
