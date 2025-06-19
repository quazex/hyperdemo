import { UsersDataEntity } from '@domain/database';
import { UsersDataModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersRepository {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

    public async upsert(model: UsersDataModel): Promise<void> {
        await this.dataSource.transaction('REPEATABLE READ', async(em) => {
            const repository = em.getRepository(UsersDataEntity);

            const previous = await repository.findOneBy({
                email: model.email,
            });

            if (previous) {
                model.created = previous.created_at;
            }

            const entity = model.toEntity();
            await repository.save(entity);
        });
    }
}
