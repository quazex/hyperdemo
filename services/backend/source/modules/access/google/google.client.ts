import { Inject } from '@nestjs/common';
import axios from 'axios';
import { InjectGoogleOptions } from './google.decorators';
import { GoogleState } from './google.state';
import {
    TGoogleCallback,
    TGoogleOptions,
    TGooglePayload,
    TGoogleProfile,
    TGoogleState,
    TGoogleToken,
} from './google.types';

export class GoogleClient {
    constructor(
        @InjectGoogleOptions() private readonly options: TGoogleOptions,
        @Inject(GoogleState) private readonly payload: GoogleState,
    ) {}

    /**
     * @link https://developers.google.com/identity/protocols/oauth2/web-server#httprest_1
     * @returns URL string to google authentication page
     */
    public getAuthURL(state: TGoogleState): string {
        const payload = this.payload.encode(state);
        const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');

        authUrl.searchParams.set('client_id', this.options.client_id);
        authUrl.searchParams.set('redirect_uri', this.options.callback_url);
        authUrl.searchParams.set('response_type', 'code');
        authUrl.searchParams.set('scope', 'profile email');
        authUrl.searchParams.set('state', payload);

        return authUrl.toString();
    }

    public async getProfile(params: TGoogleCallback): Promise<TGooglePayload> {
        const token = await axios.request<TGoogleToken>({
            method: 'POST',
            url: 'https://oauth2.googleapis.com/token',
            data: {
                code: params.code,
                client_id: this.options.client_id,
                client_secret: this.options.client_secret,
                redirect_uri: this.options.callback_url,
                grant_type: 'authorization_code',
            },
        });
        const profile = await axios.request<TGoogleProfile>({
            url: 'https://www.googleapis.com/oauth2/v3/userinfo',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token.data.access_token}`,
            },
        });
        const state = this.payload.decode(params.state);
        return {
            ...profile.data,
            ...state,
        };
    }
}
