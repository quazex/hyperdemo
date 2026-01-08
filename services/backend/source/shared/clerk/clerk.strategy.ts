import { verifyToken, ClerkOptions } from '@clerk/backend'
import { JwtPayload } from '@clerk/types'
import { HttpStatus, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AppError } from '@shared/errors'
import { FastifyRequest } from 'fastify'
import { Strategy } from 'passport-custom'
import { InjectClerkOptions } from './clerk.decorators'

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
  constructor(
    @InjectClerkOptions() private readonly clerkOptions: ClerkOptions,
  ) {
    super()
  }

  public async validate(req: FastifyRequest): Promise<NonNullable<JwtPayload>> {
    const token = req.headers.authorization?.split(' ').at(-1)

    if (!token) {
      throw new AppError({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
        context: {
          cause: 'No token provided',
        },
      })
    }

    try {
      const tokenPayload = await verifyToken(token, {
        secretKey: this.clerkOptions.secretKey,
        jwtKey: this.clerkOptions.jwtKey,
      })

      return tokenPayload
    } catch (error) {
      const context = error instanceof Error
        ? error.message
        : undefined

      throw new AppError({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
        context,
      })
    }
  }
}
