import { TContextRequest } from '@shared/context'
import { UsersTokenFactory } from '@domain/mocks/users/token.factory'

export class TestingContext {
  public getStore(): TContextRequest {
    return {
      user: UsersTokenFactory.getOne(),
    }
  }
}
