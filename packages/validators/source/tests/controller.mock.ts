import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TestsValidatorsDto } from './validators.mock';

@Controller('')
export class TestsValidatorsController {
    @HttpCode(HttpStatus.OK)
    @Post('/')
    public check(@Body() body: TestsValidatorsDto): TestsValidatorsDto {
        return body;
    }
}
