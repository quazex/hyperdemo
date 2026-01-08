import { TBrandsShortSchema } from '@domain/schemas'
import { ApiProperty } from '@nestjs/swagger'

export class BrandsShortRes implements TBrandsShortSchema {
  @ApiProperty({ description: 'UUID v4' })
  public id: string

  public name: string
}
