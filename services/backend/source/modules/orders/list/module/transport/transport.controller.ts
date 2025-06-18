import { ClerkGuard } from '@access/clerk';
import { OrdersListRes, PaginationReq } from '@domain/restapi';
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    UseGuards,
    Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersListService } from '../business/business.handler';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(ClerkGuard)
@Controller()
export class OrdersListController {
    constructor(private readonly service: OrdersListService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: OrdersListRes,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('orders/list')
    public async getOrders(
        @Query() query: PaginationReq,
    ): Promise<OrdersListRes> {
        const entities = await this.service.getList({
            page: query.page,
        });
        return OrdersListRes.init(entities);
    }
}
