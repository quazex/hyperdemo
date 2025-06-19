import { UsersDataEntity } from '@domain/database';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './business/users.service';
import { UsersRepository } from './integration/users.repository';
import { UsersController } from './transport/users.controller';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsersDataEntity,
        ]),
    ],
    providers: [UsersRepository, UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
