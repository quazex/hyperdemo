import { TCategoriesListSchema } from '@domain/schemas'
import { CategoriesDataModel } from './data.model'

export class CategoriesListModel {
  #list: CategoriesDataModel[]
  #total: number
  #pages: number

  constructor() {
    this.#list = []
    this.#total = 0
    this.#pages = 0
  }

  public static init(): CategoriesListModel {
    return new CategoriesListModel()
  }

  public set total(value: number) {
    this.#total = value
  }

  public set pages(value: number) {
    this.#pages = value
  }

  public set list(values: CategoriesDataModel[]) {
    this.#list = values
  }

  public toSchema(): TCategoriesListSchema {
    return {
      rows: this.#list.map((m) => m.toSchema()),
      total: this.#total,
      pages: this.#pages,
    }
  }
}
