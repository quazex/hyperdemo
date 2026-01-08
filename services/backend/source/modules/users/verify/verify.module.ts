import { Module } from '@nestjs/common'
import { UsersVerifyService } from './module/business/business.handler'
import { UsersVerifyController } from './module/transport/transport.controller'

@Module({
  providers: [
    UsersVerifyService,
  ],
  controllers: [
    UsersVerifyController,
  ],
})
export class UsersVerifyModule {}
