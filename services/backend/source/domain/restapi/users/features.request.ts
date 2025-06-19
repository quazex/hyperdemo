import { ApiProperty } from '@nestjs/swagger';

import { UsersFeatures } from '../types/features.models';

import { AuthFeature } from 'src/shared/auth/auth.features';

export class UsersFeaturesResponse implements UsersFeatures {
  @ApiProperty({
    example: [AuthFeature.CASINO_GET_ITEM],
    enum: AuthFeature,
  })
  features: AuthFeature[];
}
