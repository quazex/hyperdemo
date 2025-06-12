import { CategoriesListRes, PaginationReq } from '@domain/restapi';
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    Version,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesListService } from '../business/business.handler';

@ApiTags('Categories')
@Controller()
export class CategoriesListController {
    constructor(private readonly categoriesListService: CategoriesListService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: CategoriesListRes,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('categories/list')
    public async getList(
        @Query() query: PaginationReq,
    ): Promise<CategoriesListRes> {
        const entities = await this.categoriesListService.getList({
            page: query.page,
        });
        return CategoriesListRes.init(entities);
    }
}
