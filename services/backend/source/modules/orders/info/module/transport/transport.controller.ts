import { OrdersDataRes } from '@domain/restapi'
import { OrdersPrimaryReq } from '@domain/restapi/orders/primary.request'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
  Version,
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ClerkGuard } from '@shared/clerk'
import { OrdersInfoService } from '../business/business.handler'

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(ClerkGuard)
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
    const model = await this.service.getInfo({
      order_id: query.order_id,
    })
    return OrdersDataRes.init(model)
  }
}
