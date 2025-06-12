import { ProductsAnalyticsReq, ProductsAnalyticsRes, ProductsPrimaryReq } from '@domain/restapi';
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
import { ProductsAnalyticsService } from '../business/business.handler';

@ApiTags('Products')
@Controller()
export class ProductsAnalyticsController {
    constructor(private readonly productsAnalyticsService: ProductsAnalyticsService) {}

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
        const entities = await this.productsAnalyticsService.getList({
            product_id: params.product_id,
            date_from: query.date_from,
            date_to: query.date_to,
        });
        return ProductsAnalyticsRes.init(entities);
    }
}
