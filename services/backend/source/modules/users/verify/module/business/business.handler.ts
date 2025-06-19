import { InjectAuthClient } from '@auth';
import { ClerkClient } from '@clerk/backend';
import { UsersDataModel } from '@domain/models';
import { Exception } from '@hyperdemo/nestjs/modules/exception';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UsersVerifyService {
    constructor(@InjectAuthClient() private readonly client: ClerkClient) {}

    public async verify(userId: string): Promise<UsersDataModel> {
        try {
            const user = await this.client.users.getUser(userId);
            return UsersDataModel.fromEntity(user);
        }
        catch (error) {
            throw new Exception({
                message: 'Unauthorized',
                status: HttpStatus.UNAUTHORIZED,
                context: error,
            });
        }
    }
}
