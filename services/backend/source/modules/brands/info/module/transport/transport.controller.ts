import { AuthGuard } from '@auth';
import { BrandsDataRes, BrandsPrimaryReq } from '@domain/restapi';
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
import { BrandsInfoService } from '../business/business.handler';

@ApiTags('Brands')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class BrandsInfoController {
    constructor(private readonly service: BrandsInfoService) {}

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
        const entity = await this.service.getInfo({
            brand_id: params.brand_id,
        });
        return BrandsDataRes.init(entity);
    }
}
