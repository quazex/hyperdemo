import { UsersDataModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { TUsersCreateParams } from '../../types/create.types';
import { UsersRepository } from '../integration/users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository) {}

    public async upsert(params: TUsersCreateParams): Promise<UsersDataModel> {
        const model = UsersDataModel.init(params);
        await this.userRepository.upsert(model);
        return model;
    }
}
