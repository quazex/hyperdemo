import { BrandsListModel } from '@domain/models'
import { TBrandsListSchema } from '@domain/schemas'
import { ApiProperty } from '@nestjs/swagger'
import { plainToInstance, Type } from 'class-transformer'
import { BrandsDataRes } from './data.response'

export class BrandsListRes implements TBrandsListSchema {
  @ApiProperty({ minimum: 0 })
  public total: number

  @ApiProperty({ minimum: 0 })
  public pages: number

  @Type(() => BrandsDataRes)
  public rows: BrandsDataRes[]

  public static init(model: BrandsListModel): BrandsListRes {
    const schema = model.toSchema()
    return plainToInstance(BrandsListRes, schema)
  }
}
