import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Version,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsPrimaryDto } from '../../../shared/primary.dto';
import { ProductsInfoService } from '../business/business.handler';
import { ProductsInfoRes } from './transport.response';

@ApiTags('Products')
@Controller()
export class ProductsInfoController {
    constructor(private readonly productsInfoService: ProductsInfoService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: ProductsInfoRes,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('products/:product_id/info')
    public async getInfo(
        @Param() params: ProductsPrimaryDto,
    ): Promise<ProductsInfoRes> {
        const entity = await this.productsInfoService.getInfo({
            product_id: params.product_id,
        });
        return ProductsInfoRes.init(entity);
    }
}
