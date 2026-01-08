import { TOrdersProductsDataSchema } from '@domain/schemas'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { BrandsShortRes } from '../../brands/short.response'
import { CategoriesShortRes } from '../../categories/short.response'
import { ProductsImagesRes } from '../../products/images.response'

export class OrdersProductsDataRes implements TOrdersProductsDataSchema {
  @ApiProperty({ description: 'UUID v4' })
  public product_id: string

  public name: string

  public description: string

  @Type(() => ProductsImagesRes)
  public images: ProductsImagesRes[]

  @Type(() => BrandsShortRes)
  public brand: BrandsShortRes

  @Type(() => CategoriesShortRes)
  public category: CategoriesShortRes

  @ApiProperty({ minimum: 0 })
  public price: number

  @ApiProperty({ minimum: 0 })
  public quantity: number
}
