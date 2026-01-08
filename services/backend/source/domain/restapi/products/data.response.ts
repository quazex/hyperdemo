import { ProductsDataModel } from '@domain/models'
import { TProductsDataSchema } from '@domain/schemas'
import { ApiProperty } from '@nestjs/swagger'
import { plainToInstance, Type } from 'class-transformer'
import { BrandsShortRes } from '../brands/short.response'
import { CategoriesShortRes } from '../categories/short.response'
import { ProductsImagesRes } from './images.response'

export class ProductsDataRes implements TProductsDataSchema {
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
  public feedbacks: number

  public static init(model: ProductsDataModel): ProductsDataRes {
    const schema = model.toSchema()
    return plainToInstance(ProductsDataRes, schema)
  }
}
