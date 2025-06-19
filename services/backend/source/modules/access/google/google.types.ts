export interface TGoogleOptions {
    client_id: string;
    client_secret: string;
    callback_url: string;
}

export interface TGoogleState {
    device: string;
    callback_url: string;
}

export interface TGoogleCallback {
    code: string;
    state: string;
}

export interface TGoogleToken {
    access_token: string;
}

export interface TGoogleProfile {
    family_name: string;
    sub: string;
    picture: string;
    email_verified: boolean;
    given_name: string;
    email: string;
    name: string;
}

export interface TGooglePayload extends TGoogleProfile {
    // CUSTOM FIELDS
    device: string;
    callback_url: string;
}
