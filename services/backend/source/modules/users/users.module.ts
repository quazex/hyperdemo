import { Module } from '@nestjs/common';
import { UsersVerifyModule } from './verify/verify.module';

@Module({
    imports: [
        UsersVerifyModule,
    ],
})
export class UsersModule {}
