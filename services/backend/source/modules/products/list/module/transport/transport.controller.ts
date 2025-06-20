import { AuthGuard } from '@auth';
import { PaginationReq, ProductsListRes } from '@domain/restapi';
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
import { ProductsListService } from '../business/business.handler';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class ProductsListController {
    constructor(private readonly service: ProductsListService) {}

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
        const model = await this.service.getList({
            page: query.page,
        });
        return ProductsListRes.init(model);
    }
}
