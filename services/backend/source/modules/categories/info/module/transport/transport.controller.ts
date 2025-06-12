import { CategoriesDataRes } from '@domain/restapi';
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

@ApiTags('Categories')
@Controller()
export class CategoriesInfoController {
    constructor(private readonly service: CategoriesInfoService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: CategoriesDataRes,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('categories/:category_id/info')
    public async getInfo(
        @Param() params: CategoriesPrimaryParams,
    ): Promise<CategoriesDataRes> {
        const entity = await this.service.getInfo({
            category_id: params.category_id,
        });
        return CategoriesDataRes.init(entity);
    }
}
