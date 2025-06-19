import { InjectGoogleClient, TGoogleCallback, TGoogleState } from '@access/google';
import { GoogleClient } from '@access/google/google.client';
import { AppConfig } from '@config';
import {
    TUserDataProvider,
    TUserSessionsStatus,
    UsersDataModel,
    UsersSessionsModel,
} from '@domain/models';
import { Injectable, Logger } from '@nestjs/common';
import { TSessionsSigned } from '../../types/signin.types';
import { SessionsCryptoRepository } from '../integrations/crypto.repository';
import { SessionsUsersRepository } from '../integrations/users.repository';

@Injectable()
export class SessionsGoogleService {
    private readonly logger = new Logger('SessionsGoogle');

    constructor(
        private readonly appConfig: AppConfig,
        private readonly cryptoService: SessionsCryptoRepository,
        private readonly usersRepository: SessionsUsersRepository,
        @InjectGoogleClient() private readonly client: GoogleClient,
    ) {}

    public getAuthURL(params: TGoogleState): string {
        const url = this.client.getAuthURL({
            device: params.device,
            callback_url: params.callback_url,
        });
        return url;
    }

    public async upsertProfile(params: TGoogleCallback): Promise<TSessionsSigned> {
        const profile = await this.client.getProfile(params);
        const expires = this.appConfig.now.plus({ days: 30 }).toJSDate();

        const userData = UsersDataModel.init({
            email: profile.email,
            name: profile.name,
            picture: profile.picture,
            provider: TUserDataProvider.google,
        });

        const session = UsersSessionsModel.init({
            user_id: userData.id,
            status: TUserSessionsStatus.active,
            device: profile.device,
            expires_at: expires,
        });

        await this.usersRepository.write(
            userData,
            session,
        );

        const token = await this.cryptoService.encode({
            sub: userData.id,
        });

        if (this.appConfig.production === false) {
            this.logger.log(token);
        }

        const callback = new URL(profile.callback_url);
        callback.searchParams.set('access_token', token);

        return {
            location: callback.toString(),
            refresh_token: session.id,
        };
    }
}
