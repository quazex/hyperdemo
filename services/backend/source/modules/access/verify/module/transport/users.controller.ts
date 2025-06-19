import { Controller, Get, HttpCode, HttpStatus, UseGuards, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../business/users.service';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthProfileGuard)
@Controller()
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: UsersPayloadResponse,
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('users/verify')
    public verifyPlatform(@User() user: AuthPayload): UsersPayload {
        return this.service.getPlatformPayload(user);
    }
}
