import { BrandsAnalyticsEntity } from '@domain/database'
import { TBrandsAnalyticsSchema } from '@domain/schemas'

export class BrandsAnalyticsModel {
  #schema: TBrandsAnalyticsSchema

  constructor(schema: TBrandsAnalyticsSchema) {
    this.#schema = schema
  }

  public static fromEntity(entity: BrandsAnalyticsEntity): BrandsAnalyticsModel {
    return new BrandsAnalyticsModel({
      revenue: entity.revenue,
      date: entity.date,
    })
  }

  public toSchema(): TBrandsAnalyticsSchema {
    return this.#schema
  }
}
