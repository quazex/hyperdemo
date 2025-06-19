import { UsersDataEntity } from '@domain/database';
import { TUsersDataSchema } from '@domain/schemas';
import { v5 as UUIDv5 } from 'uuid';

export enum TUserDataProvider {
    google = 'google',
}

export interface TUserDataModel {
    email: string;
    name: string;
    picture: string;
    provider: string;
    created_at?: Date;
}

export class UsersDataModel {
    #id: string;
    #email: string;
    #name: string;
    #picture: string;
    #provider: string;
    #created_at: Date;

    private constructor(fields: TUserDataModel) {
        this.#id = UUIDv5(fields.email, UUIDv5.URL);
        this.#email = fields.email;
        this.#name = fields.name;
        this.#picture = fields.picture;
        this.#provider = fields.provider;
        this.#created_at = fields.created_at ?? this.updated;
    }

    public static init(fields: TUserDataModel) {
        return new UsersDataModel(fields);
    }

    public static fromEntity(entity: UsersDataEntity) {
        return new UsersDataModel(entity);
    }

    public get id(): string {
        return this.#id;
    }

    public set created(value: Date) {
        this.#created_at = value;
    }

    public get updated(): Date {
        return new Date();
    }

    public toEntity(): UsersDataEntity {
        const user = new UsersDataEntity();

        user.user_id = this.#id;
        user.email = this.#email;
        user.name = this.#name;
        user.picture = this.#picture;
        user.provider = this.#provider;
        user.created_at = this.#created_at;
        user.updated_at = this.updated;

        return user;
    }

    public toSchema(): TUsersDataSchema {
        return {
            user_id: this.#id,
            email: this.#email,
            name: this.#name,
            picture: this.#picture,
        };
    }
}
