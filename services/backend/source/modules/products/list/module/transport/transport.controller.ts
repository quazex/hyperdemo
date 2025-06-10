import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    Version,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationReq } from '../../../../../shared/pagination';
import { ProductsListService } from '../business/business.handler';
import { ProductsListResponse } from './transport.response';

@ApiTags('Products')
@Controller()
export class ProductsListController {
    constructor(private readonly brandsProductsService: ProductsListService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: ProductsListResponse,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('products/list')
    public async getProducts(
        @Query() query: PaginationReq,
    ): Promise<ProductsListResponse> {
        const entities = await this.brandsProductsService.getList({
            page: query.page,
        });
        return ProductsListResponse.init(entities);
    }
}
