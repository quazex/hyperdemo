import { BrandsDataRes, BrandsPrimaryReq } from '@domain/restapi';
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Version,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BrandsInfoService } from '../business/business.handler';

@ApiTags('Brands')
@Controller()
export class BrandsInfoController {
    constructor(private readonly brandsInfoService: BrandsInfoService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: BrandsDataRes,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('brands/:brand_id/info')
    public async getInfo(
        @Param() params: BrandsPrimaryReq,
    ): Promise<BrandsDataRes> {
        const entity = await this.brandsInfoService.getInfo({
            brand_id: params.brand_id,
        });
        return BrandsDataRes.init(entity);
    }
}
