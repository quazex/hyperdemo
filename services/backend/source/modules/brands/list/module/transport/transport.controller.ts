import { BrandsListRes, PaginationReq } from '@domain/restapi';
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    Version,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BrandsListService } from '../business/business.handler';

@ApiTags('Brands')
@Controller()
export class BrandsListController {
    constructor(private readonly brandsListService: BrandsListService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: BrandsListRes,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('brands/list')
    public async getList(
        @Query() query: PaginationReq,
    ): Promise<BrandsListRes> {
        const entities = await this.brandsListService.getList({
            page: query.page,
        });
        return BrandsListRes.init(entities);
    }
}
