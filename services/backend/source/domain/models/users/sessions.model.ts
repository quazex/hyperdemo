import { UsersSessionsEntity } from '@domain/database';
import { TUsersSessionsSchema } from '@domain/schemas';
import { v6 as UUIDv6 } from 'uuid';

export enum TUserSessionsStatus {
    active = 'active',
    revoked = 'revoked',
}

export interface TUserSessionsSession {
    session_id?: string;
    user_id: string;
    status: string;
    device: string;
    expires_at: Date;
    created_at?: Date;
}

export class UsersSessionsModel {
    #id: string;
    #user_id: string;
    #status: string;
    #device: string;
    #expires_at: Date;
    #created_at: Date;

    private constructor(fields: TUserSessionsSession) {
        this.#id = fields.session_id ?? UUIDv6();
        this.#user_id = fields.user_id;
        this.#status = fields.status;
        this.#device = fields.device;
        this.#created_at = fields.created_at ?? new Date();
    }

    public static init(fields: TUserSessionsSession) {
        return new UsersSessionsModel(fields);
    }

    public static fromEntity(entity: UsersSessionsEntity) {
        return new UsersSessionsModel({
            session_id: entity.session_id,
            user_id: entity.user_id,
            status: entity.status,
            device: entity.device,
            expires_at: entity.expires_at,
            created_at: entity.created_at,
        });
    }

    public get id(): string {
        return this.#id;
    }

    public get userID(): string {
        return this.#user_id;
    }

    public toEntity(): UsersSessionsEntity {
        const session = new UsersSessionsEntity();

        session.session_id = this.#id;
        session.user_id = this.#user_id;
        session.status = this.#status;
        session.device = this.#device;
        session.expires_at = this.#expires_at;
        session.created_at = this.#created_at;

        return session;
    }

    public toSchema(): TUsersSessionsSchema {
        return {
            refresh_token: this.#id,
        };
    }
}
