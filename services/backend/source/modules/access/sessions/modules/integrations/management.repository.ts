import { UsersSessionsEntity } from '@domain/database';
import { TUserSessionsStatus, UsersSessionsModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SessionsManagementRepository {
    constructor(
        @InjectRepository(UsersSessionsEntity) private readonly repository: Repository<UsersSessionsEntity>,
    ) {}

    public async find(sessionId: string): Promise<UsersSessionsModel | null> {
        const entity = await this.repository.findOne({
            where: {
                session_id: sessionId,
                status: TUserSessionsStatus.active,
            },
        });
        if (entity) {
            return UsersSessionsModel.fromEntity(entity);
        }
        return null;
    }

    public async delete(sessionId: string): Promise<void> {
        await this.repository.delete({
            session_id: sessionId,
        });
    }
}
