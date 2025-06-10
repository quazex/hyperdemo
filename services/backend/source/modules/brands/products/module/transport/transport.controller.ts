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
import { BrandsPrimaryParams } from '../../../shared/brands.params';
import { BrandsProductsService } from '../business/business.handler';
import { BrandsProductsResponse } from './dto/response.dto';

@ApiTags('Brands')
@Controller()
export class BrandsProductsController {
    constructor(private readonly brandsProductsService: BrandsProductsService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: BrandsProductsResponse,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('brands/:brand_id/products')
    public async getProducts(
        @Param() params: BrandsPrimaryParams,
        @Query() query: PaginationReq,
    ): Promise<BrandsProductsResponse> {
        const entities = await this.brandsProductsService.getProducts({
            brand_id: params.brand_id,
            page: query.page,
        });
        return BrandsProductsResponse.init(entities);
    }
}
