import { UsersDataRes } from '@domain/restapi';
import { ClerkGuard } from '@hyperdemo/clerk';
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    UseGuards,
    Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersVerifyService } from '../business/business.handler';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(ClerkGuard)
@Controller()
export class UsersVerifyController {
    constructor(private readonly service: UsersVerifyService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: UsersDataRes,
        isArray: false,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('users/verify')
    public async verify(): Promise<UsersDataRes> {
        const model = await this.service.getUser();
        return UsersDataRes.init(model);
    }
}
