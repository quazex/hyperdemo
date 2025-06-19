import { Injectable } from '@nestjs/common';
import { TGoogleState } from './google.types';

@Injectable()
export class GoogleState {
    public encode(payload: TGoogleState): string {
        const json = JSON.stringify(payload);
        return Buffer.from(json).toString('base64');
    }

    public decode(raw: string): TGoogleState {
        const text = Buffer.from(raw, 'base64').toString();
        return JSON.parse(text) as TGoogleState;
    }
}
