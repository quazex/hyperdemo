import { ClerkClient } from '@clerk/backend'
import { UsersDataModel } from '@domain/models'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectClerkClient } from '@shared/clerk'
import { ContextProvider } from '@shared/context'
import { AppError } from '@shared/errors'

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
      throw new AppError({
        message: 'Unauthorized',
        status: HttpStatus.UNAUTHORIZED,
        context: error,
      })
    }
  }
}
