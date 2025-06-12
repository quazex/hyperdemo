import { PaginationReq, OrdersProductsList, OrdersPrimaryReq } from '@domain/restapi';
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
import { OrdersProductsService } from '../business/business.handler';

@ApiTags('Orders')
@Controller()
export class OrdersProductsController {
    constructor(private readonly brandsProductsService: OrdersProductsService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: OrdersProductsList,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('products/:order_id/products')
    public async getProducts(
        @Param() param: OrdersPrimaryReq,
        @Query() query: PaginationReq,
    ): Promise<OrdersProductsList> {
        const entities = await this.brandsProductsService.getList({
            order_id: param.order_id,
            page: query.page,
        });
        return OrdersProductsList.init(entities);
    }
}
