import { User } from '@clerk/backend';
import { TUsersDataSchema } from '@domain/schemas';
import { DateTime } from 'luxon';

export class UsersDataModel {
    #schema: TUsersDataSchema;

    private constructor(schema: TUsersDataSchema) {
        this.#schema = schema;
    }

    public static fromEntity(entity: User) {
        return new UsersDataModel({
            user_id: entity.id,
            image_url: entity.imageUrl,
            created_at: DateTime.fromMillis(entity.createdAt).toISO(),
        });
    }

    public toSchema(): TUsersDataSchema {
        return this.#schema;
    }
}
