import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Version,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesPrimaryParams } from '../../../shared/primary.params';
import { CategoriesInfoService } from '../business/business.handler';
import { CategoriesInfoRes } from './transport.response';

@ApiTags('Categories')
@Controller()
export class CategoriesInfoController {
    constructor(private readonly categoriesInfoService: CategoriesInfoService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: CategoriesInfoRes,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('categories/:category_id/info')
    public async getInfo(
        @Param() params: CategoriesPrimaryParams,
    ): Promise<CategoriesInfoRes> {
        const entity = await this.categoriesInfoService.getInfo({
            category_id: params.category_id,
        });
        return CategoriesInfoRes.init(entity);
    }
}
