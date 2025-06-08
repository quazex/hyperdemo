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
import { CategoriesListService } from '../business/business.handler';
import { CategoriesListResponse } from './dto/response.dto';

@ApiTags('Categories')
@Controller()
export class CategoriesListController {
    constructor(private readonly categoriesListService: CategoriesListService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: CategoriesListResponse,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('categories/list')
    public async getList(
        @Query() query: PaginationReq,
    ): Promise<CategoriesListResponse> {
        const entities = await this.categoriesListService.getList({
            page: query.page,
        });
        return CategoriesListResponse.init(entities);
    }
}
