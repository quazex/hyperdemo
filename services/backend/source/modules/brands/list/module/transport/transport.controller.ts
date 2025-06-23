import { BrandsListRes, PaginationReq } from '@domain/restapi';
import { ClerkGuard } from '@hyperdemo/clerk';
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
import { BrandsListService } from '../business/business.handler';

@ApiTags('Brands')
@ApiBearerAuth()
@UseGuards(ClerkGuard)
@Controller()
export class BrandsListController {
    constructor(private readonly service: BrandsListService) {}

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
        const model = await this.service.getList({
            page: query.page,
        });
        return BrandsListRes.init(model);
    }
}
