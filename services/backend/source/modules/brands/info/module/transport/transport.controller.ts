import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Version,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BrandsPrimaryParams } from '../../../shared/primary.params';
import { BrandsInfoService } from '../business/business.handler';
import { BrandsInfoRes } from './transport.response';

@ApiTags('Brands')
@Controller()
export class BrandsInfoController {
    constructor(private readonly brandsInfoService: BrandsInfoService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: BrandsInfoRes,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('brands/:brand_id/info')
    public async getInfo(
        @Param() params: BrandsPrimaryParams,
    ): Promise<BrandsInfoRes> {
        const entity = await this.brandsInfoService.getInfo({
            brand_id: params.brand_id,
        });
        return BrandsInfoRes.init(entity);
    }
}
