/* eslint-disable @typescript-eslint/naming-convention */
import { Settings } from 'luxon';

Settings.throwOnInvalid = true;

declare module 'luxon' {
    export interface TSSettings {
        throwOnInvalid: true;
    }
}
