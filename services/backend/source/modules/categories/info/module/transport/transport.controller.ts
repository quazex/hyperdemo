import { AuthGuard } from '@auth';
import { CategoriesDataRes, CategoriesPrimaryReq } from '@domain/restapi';
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    UseGuards,
    Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesInfoService } from '../business/business.handler';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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
        @Param() params: CategoriesPrimaryReq,
    ): Promise<CategoriesDataRes> {
        const model = await this.service.getInfo({
            category_id: params.category_id,
        });
        return CategoriesDataRes.init(model);
    }
}
