import { faker } from '@faker-js/faker'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

@Injectable()
export class TestingGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>()

    request.user = {
      __raw: '',
      iss: faker.word.noun(),
      sub: faker.string.uuid(),
      sid: faker.string.uuid(),
      nbf: faker.date.recent().getTime(),
      exp: faker.date.recent().getTime(),
      iat: faker.date.recent().getTime(),
    }

    return true
  }
}
