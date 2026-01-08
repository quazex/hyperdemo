import { UsersTokenFactory } from '@domain/mocks/users/token.factory'
import { TContextRequest } from '@shared/context'

export class TestingContext {
  public getStore(): TContextRequest {
    return {
      user: UsersTokenFactory.getOne(),
    }
  }
}
