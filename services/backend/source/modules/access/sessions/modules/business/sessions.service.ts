import { Exception } from '@hyperdemo/nestjs/modules/exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { SessionsCryptoRepository } from '../integrations/crypto.repository';
import { SessionsManagementRepository } from '../integrations/management.repository';

@Injectable()
export class SessionsManagementService {
    constructor(
        private readonly cryptoService: SessionsCryptoRepository,
        private readonly repository: SessionsManagementRepository,
    ) {}

    public async refresh(sessionId: string): Promise<string> {
        const session = await this.repository.find(sessionId);

        if (!session) {
            throw new Exception({
                message: 'Unauthorized',
                status: HttpStatus.UNAUTHORIZED,
                context: {
                    cause: 'Cannot find session',
                    action: this.refresh.name,
                    sessionId,
                },
            });
        }

        const token = await this.cryptoService.encode({
            sub: session.userID,
        });

        return token;
    }

    public async revoke(sessionId: string): Promise<void> {
        const session = await this.repository.find(sessionId);

        if (!session) {
            throw new Exception({
                message: 'Unauthorized',
                status: HttpStatus.UNAUTHORIZED,
                context: {
                    cause: 'Cannot find session',
                    action: this.revoke.name,
                    sessionId,
                },
            });
        }

        await this.repository.delete(session.id);
    }
}
