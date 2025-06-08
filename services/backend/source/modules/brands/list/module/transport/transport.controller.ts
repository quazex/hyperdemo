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
import { BrandsListService } from '../business/business.handler';
import { BrandsListResponse } from './dto/response.dto';

@ApiTags('Brands')
@Controller()
export class BrandsListController {
    constructor(private readonly brandsListService: BrandsListService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: BrandsListResponse,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('brands/list')
    public async getList(
        @Query() query: PaginationReq,
    ): Promise<BrandsListResponse> {
        const entities = await this.brandsListService.getList({
            page: query.page,
        });
        return BrandsListResponse.init(entities);
    }
}
