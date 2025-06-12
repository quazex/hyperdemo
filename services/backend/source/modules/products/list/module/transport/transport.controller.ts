import { PaginationReq, ProductsListRes } from '@domain/restapi';
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    Version,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsListService } from '../business/business.handler';

@ApiTags('Products')
@Controller()
export class ProductsListController {
    constructor(private readonly brandsProductsService: ProductsListService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: ProductsListRes,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('products/list')
    public async getProducts(
        @Query() query: PaginationReq,
    ): Promise<ProductsListRes> {
        const entities = await this.brandsProductsService.getList({
            page: query.page,
        });
        return ProductsListRes.init(entities);
    }
}
