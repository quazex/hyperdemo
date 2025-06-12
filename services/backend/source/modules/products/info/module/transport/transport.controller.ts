import { ProductsDataRes, ProductsPrimaryReq } from '@domain/restapi';
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Version,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsInfoService } from '../business/business.handler';

@ApiTags('Products')
@Controller()
export class ProductsInfoController {
    constructor(private readonly productsInfoService: ProductsInfoService) {}

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
        const entity = await this.productsInfoService.getInfo({
            product_id: params.product_id,
        });
        return ProductsDataRes.init(entity);
    }
}
