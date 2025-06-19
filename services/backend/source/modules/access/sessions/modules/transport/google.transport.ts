import { Controller, Get, HttpStatus, Query, Res, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { SessionsGoogleService } from '../business/google.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller()
export class GoogleController {
    constructor(private readonly service: SessionsGoogleService) {}

    @Version('1')
    @Get('users/google/callback')
    public async callback(
        @Query() query: GoogleCallbackRequest,
        @Res() response: FastifyReply,
    ) {
        const session = await this.service.upsertProfile(query);

        response.setCookie('refresh_token', session.refresh_token, {
            httpOnly: true,
            path: '/api/v1/users/refresh',
        });

        response
            .status(HttpStatus.MOVED_PERMANENTLY)
            .redirect(session.location);
    }

    @Version('1')
    @Get('users/google/signin')
    public signin(
        @Query() query: GoogleSigninRequest,
        @Res() response: FastifyReply,
    ) {
        const location = this.service.getAuthURL(query);
        return response
            .status(HttpStatus.MOVED_PERMANENTLY)
            .redirect(location);
    }
}
