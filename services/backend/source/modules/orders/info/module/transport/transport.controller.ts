import { OrdersDataRes } from '@models/restapi';
import { OrdersPrimaryReq } from '@models/restapi/orders/primary.request';
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Version,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersInfoService } from '../business/business.handler';

@ApiTags('Orders')
@Controller()
export class OrdersInfoController {
    constructor(private readonly service: OrdersInfoService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: OrdersDataRes,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('orders/:order_id/info')
    public async getOne(
        @Param() query: OrdersPrimaryReq,
    ): Promise<OrdersDataRes> {
        const doc = await this.service.getInfo({
            order_id: query.order_id,
        });
        return OrdersDataRes.init(doc);
    }
}
