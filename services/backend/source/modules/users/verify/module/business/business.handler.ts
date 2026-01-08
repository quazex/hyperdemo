import { ClerkClient } from '@clerk/backend'
import { ContextProvider } from '@shared/context'
import { UsersDataModel } from '@domain/models'
import { InjectClerkClient } from '@hyperdemo/clerk'
import { Exception } from '@hyperdemo/exceptions'
import { HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class UsersVerifyService {
  constructor(
    @InjectClerkClient() private readonly client: ClerkClient,
    private readonly context: ContextProvider,
  ) {}

  public async getUser(): Promise<UsersDataModel> {
    try {
      const context = this.context.getStore()
      const user = await this.client.users.getUser(context.user.sub)

      return UsersDataModel.init(user)
    } catch (error) {
      throw new Exception({
        message: 'Unauthorized',
        status: HttpStatus.UNAUTHORIZED,
        context: error,
      })
    }
  }
}
