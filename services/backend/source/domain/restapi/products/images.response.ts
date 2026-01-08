import { TProductsImageSchema } from '@domain/schemas'
import { ApiProperty } from '@nestjs/swagger'

export class ProductsImagesRes implements TProductsImageSchema {
  @ApiProperty({ description: 'UUID v4' })
  public id: string

  public small: string

  public regular: string

  public large: string
}
