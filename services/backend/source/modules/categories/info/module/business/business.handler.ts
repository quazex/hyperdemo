import { CategoriesDataModel } from '@domain/models'
import { HttpStatus, Injectable } from '@nestjs/common'
import { AppError } from '@shared/errors'
import { TCategoriesInfoFilters } from '../../types/filter.types'
import { CategoriesInfoRepository } from '../integration/integration.repository'

@Injectable()
export class CategoriesInfoService {
  constructor(private readonly repository: CategoriesInfoRepository) {}

  public async getInfo(filters: TCategoriesInfoFilters): Promise<CategoriesDataModel> {
    const model = await this.repository.getInfo(filters)
    if (!model) {
      throw new AppError({
        message: 'Cannot find category',
        status: HttpStatus.NOT_FOUND,
        context: filters,
      })
    }
    return model
  }
}
