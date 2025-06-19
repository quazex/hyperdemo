import { UsersDataEntity, UsersSessionsEntity } from '@domain/database';
import { UsersDataModel, UsersSessionsModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class SessionsUsersRepository {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource,
    ) {}

    public async write(data: UsersDataModel, session: UsersSessionsModel): Promise<void> {
        await this.dataSource.transaction('REPEATABLE READ', async(em) => {
            const usersRepo = em.getRepository(UsersDataEntity);
            const sessionsRepo = em.getRepository(UsersSessionsEntity);

            const userEntity = data.toEntity();
            const sessionEntity = session.toEntity();

            await usersRepo.save(userEntity);
            await sessionsRepo.save(sessionEntity);
        });
    }
}
