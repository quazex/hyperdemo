import { AuthGuard } from '@auth';
import { PaginationReq, OrdersProductsList, OrdersPrimaryReq } from '@domain/restapi';
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
import { OrdersProductsService } from '../business/business.handler';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class OrdersProductsController {
    constructor(private readonly service: OrdersProductsService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: OrdersProductsList,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('orders/:order_id/products')
    public async getProducts(
        @Param() param: OrdersPrimaryReq,
        @Query() query: PaginationReq,
    ): Promise<OrdersProductsList> {
        const entities = await this.service.getList({
            order_id: param.order_id,
            page: query.page,
        });
        return OrdersProductsList.init(entities);
    }
}
