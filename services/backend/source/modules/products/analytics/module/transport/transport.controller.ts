import { AuthGuard } from '@auth';
import { ProductsAnalyticsReq, ProductsAnalyticsRes, ProductsPrimaryReq } from '@domain/restapi';
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
import { ProductsAnalyticsService } from '../business/business.handler';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class ProductsAnalyticsController {
    constructor(private readonly service: ProductsAnalyticsService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: ProductsAnalyticsRes,
        isArray: true,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('products/:product_id/analytics')
    public async getList(
        @Param() params: ProductsPrimaryReq,
        @Query() query: ProductsAnalyticsReq,
    ): Promise<ProductsAnalyticsRes[]> {
        const entities = await this.service.getList({
            product_id: params.product_id,
            date_from: query.date_from,
            date_to: query.date_to,
        });
        return ProductsAnalyticsRes.init(entities);
    }
}
