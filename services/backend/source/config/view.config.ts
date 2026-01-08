import { Injectable } from '@nestjs/common'

@Injectable()
export class ViewConfig {
  public readonly items_per_page = 40
}
