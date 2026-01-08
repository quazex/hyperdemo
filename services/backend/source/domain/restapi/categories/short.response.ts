import { TCategoriesShortSchema } from '@domain/schemas'
import { ApiProperty } from '@nestjs/swagger'

export class CategoriesShortRes implements TCategoriesShortSchema {
  @ApiProperty({ description: 'UUID v4' })
  public id: string

  public name: string
}
