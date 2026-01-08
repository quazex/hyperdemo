import { UsersDataModel } from '@domain/models'
import { TUsersDataSchema } from '@domain/schemas'
import { ApiProperty } from '@nestjs/swagger'
import { plainToInstance } from 'class-transformer'

export class UsersDataRes implements TUsersDataSchema {
  @ApiProperty({ description: 'UUID v4' })
  public user_id: string

  @ApiProperty()
  public image_url: string

  @ApiProperty()
  public plan: string

  @ApiProperty()
  public features: string[]

  @ApiProperty({ example: '2024-07-01T12:34:56Z' })
  public created_at: string

  public static init(model: UsersDataModel): UsersDataRes {
    const schema = model.toSchema()
    return plainToInstance(UsersDataRes, schema)
  }
}
