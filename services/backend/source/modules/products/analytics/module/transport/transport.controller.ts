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
import { ProductsPrimaryDto } from '../../../shared/primary.dto';
import { ProductsAnalyticsService } from '../business/business.handler';
import { ProductsAnalyticsQuery } from './transport.query';
import { ProductsAnalyticsRes } from './transport.response';

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
        @Param() params: ProductsPrimaryDto,
        @Query() query: ProductsAnalyticsQuery,
    ): Promise<ProductsAnalyticsRes[]> {
        const entities = await this.productsAnalyticsService.getList({
            product_id: params.product_id,
            date_from: query.date_from,
            date_to: query.date_to,
        });
        return ProductsAnalyticsRes.init(entities);
    }
}
