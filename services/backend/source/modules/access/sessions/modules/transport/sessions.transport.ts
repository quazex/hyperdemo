import { Exception } from '@hyperdemo/nestjs/modules/exception';
import { Controller, HttpStatus, Post, Req, Res, Version } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SessionsManagementService } from '../business/sessions.service';

@ApiCookieAuth()
@ApiTags('Users')
@Controller()
export class GoogleController {
    constructor(private readonly service: SessionsManagementService) {}

    @Version('1')
    @Post('users/refresh')
    public async refresh(@Req() req: FastifyRequest) {
        const sessionId = req.cookies.refresh_token;

        if (!sessionId) {
            throw new Exception({
                message: 'Unauthorized',
                status: HttpStatus.UNAUTHORIZED,
                context: {
                    cause: 'Cookie was not found',
                    action: this.refresh.name,
                    token: req.cookies.refresh_token,
                },
            });
        }

        const accessToken = await this.service.refresh(sessionId);
        return {
            access_token: accessToken,
        };
    }

    @Version('1')
    @Post('users/logout')
    public async logout(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        const sessionId = req.cookies.refresh_token;

        if (!sessionId) {
            throw new Exception({
                message: 'Unauthorized',
                status: HttpStatus.UNAUTHORIZED,
                context: {
                    cause: 'Cookie was not found',
                    action: this.logout.name,
                    token: req.cookies.refresh_token,
                },
            });
        }

        await this.service.revoke(sessionId);

        res.clearCookie('refresh_token');
        res.status(HttpStatus.NO_CONTENT);
    }
}
