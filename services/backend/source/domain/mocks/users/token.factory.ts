import { JwtPayload } from '@clerk/types'
import { faker } from '@faker-js/faker'

export class UsersTokenFactory {
  public static getOne(): JwtPayload {
    return {

      __raw: '',
      iss: faker.word.noun(),
      sub: faker.string.uuid(),
      sid: faker.string.uuid(),
      nbf: faker.date.recent().getTime(),
      exp: faker.date.recent().getTime(),
      iat: faker.date.recent().getTime(),
    }
  }
}
