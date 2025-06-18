import { ClerkGuard } from '@access/clerk';
import { CategoriesAnalyticsReq, CategoriesAnalyticsRes, CategoriesPrimaryReq } from '@domain/restapi';
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
import { CategoriesAnalyticsService } from '../business/business.handler';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(ClerkGuard)
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
        @Param() params: CategoriesPrimaryReq,
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
