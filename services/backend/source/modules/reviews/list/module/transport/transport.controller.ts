import { PaginationReq, ReviewsListRes, ReviewsPrimaryReq } from '@domain/restapi'
import { ClerkGuard } from '@hyperdemo/clerk'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ReviewsListService } from '../business/business.handler'

@ApiTags('Reviews')
@ApiBearerAuth()
@UseGuards(ClerkGuard)
@Controller()
export class ReviewsListController {
  constructor(private readonly service: ReviewsListService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: ReviewsListRes,
    isArray: false,
  })
  @HttpCode(HttpStatus.OK)
  @Version('1')
  @Get('reviews/:product_id/list')
  public async getList(
    @Param() params: ReviewsPrimaryReq,
    @Query() query: PaginationReq,
  ): Promise<ReviewsListRes> {
    const entity = await this.service.getList({
      product_id: params.product_id,
      page: query.page,
    })
    return ReviewsListRes.init(entity)
  }
}
