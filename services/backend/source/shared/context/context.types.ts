import { JwtPayload } from '@clerk/types'

export interface TContextRequest {
  user: JwtPayload
}
