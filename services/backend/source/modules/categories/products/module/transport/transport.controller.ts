import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Query,
    Version,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationReq } from '../../../../../shared/pagination';
import { CategoriesPrimaryParams } from '../../../shared/categories.params';
import { CategoriesProductsService } from '../business/business.handler';
import { CategoriesProductsResponse } from './dto/response.dto';

@ApiTags('Categories')
@Controller()
export class CategoriesProductsController {
    constructor(private readonly categoriesProductsService: CategoriesProductsService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: CategoriesProductsResponse,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('categories/:category_id/products')
    public async getProducts(
        @Param() params: CategoriesPrimaryParams,
        @Query() query: PaginationReq,
    ): Promise<CategoriesProductsResponse> {
        const entities = await this.categoriesProductsService.getProducts({
            category_id: params.category_id,
            page: query.page,
        });
        return CategoriesProductsResponse.init(entities);
    }
}
