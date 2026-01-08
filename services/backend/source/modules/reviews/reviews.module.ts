import { Module } from '@nestjs/common'
import { ReviewsCreateModule } from './create/create.module'
import { ReviewsListModule } from './list/list.module'

@Module({
  imports: [
    ReviewsCreateModule,
    ReviewsListModule,
  ],
})
export class ReviewsModule {}
