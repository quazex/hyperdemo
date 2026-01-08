import { CategoriesListRes, PaginationReq } from '@domain/restapi'
import { ClerkGuard } from '@hyperdemo/clerk'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CategoriesListService } from '../business/business.handler'

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(ClerkGuard)
@Controller()
export class CategoriesListController {
  constructor(private readonly service: CategoriesListService) {}

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
    const model = await this.service.getList({
      page: query.page,
    })
    return CategoriesListRes.init(model)
  }
}
