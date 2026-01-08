import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common'
import {
  TestsRequiredComposite,
  TestsOptionalImage,
  TestsOptionalDate,
  TestsOptionalNumber,
  TestsOptionalBoolean,
  TestsStringDTO,
  TestsPriceDTO,
  TestsRequiredNumber,
} from './dto.mock'

@Controller('')
export class TestsValidatorsController {
  @HttpCode(HttpStatus.OK)
  @Post('/required/composite')
  public composite(@Body() body: TestsRequiredComposite): TestsRequiredComposite {
    return body
  }

  @HttpCode(HttpStatus.OK)
  @Get('/required/number')
  public requiredNumber(@Query() body: TestsRequiredNumber): TestsRequiredNumber {
    return body
  }

  @HttpCode(HttpStatus.OK)
  @Post('/required/price')
  public price(@Body() body: TestsPriceDTO): TestsPriceDTO {
    return body
  }

  @HttpCode(HttpStatus.OK)
  @Post('/optional/date')
  public optionalDate(@Body() body: TestsOptionalDate): TestsOptionalDate {
    return body
  }

  @HttpCode(HttpStatus.OK)
  @Post('/optional/image')
  public optionalImage(@Body() body: TestsOptionalImage): TestsOptionalImage {
    return body
  }

  @HttpCode(HttpStatus.OK)
  @Post('/optional/number')
  public optionalNumber(@Body() body: TestsOptionalNumber): TestsOptionalNumber {
    return body
  }

  @HttpCode(HttpStatus.OK)
  @Post('/optional/boolean')
  public optionalBoolean(@Body() body: TestsOptionalBoolean): TestsOptionalBoolean {
    return body
  }

  @HttpCode(HttpStatus.OK)
  @Post('/combinations/string')
  public optionalString(@Body() body: TestsStringDTO): TestsStringDTO {
    return body
  }
}
