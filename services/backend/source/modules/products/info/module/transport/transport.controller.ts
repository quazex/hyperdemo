import { ProductsDataRes, ProductsPrimaryReq } from '@domain/restapi';
import { ClerkGuard } from '@hyperdemo/clerk';
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    UseGuards,
    Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsInfoService } from '../business/business.handler';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(ClerkGuard)
@Controller()
export class ProductsInfoController {
    constructor(private readonly service: ProductsInfoService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: ProductsDataRes,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('products/:product_id/info')
    public async getInfo(
        @Param() params: ProductsPrimaryReq,
    ): Promise<ProductsDataRes> {
        const entity = await this.service.getInfo({
            product_id: params.product_id,
        });
        return ProductsDataRes.init(entity);
    }
}
