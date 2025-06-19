import { ApiProperty } from '@nestjs/swagger';

import { UsersPayload } from '../types/payload.models';

import { AuthFeature } from 'src/shared/auth/auth.features';

export class UsersPayloadResponse implements UsersPayload {
  @ApiProperty({
    example: '7760d406-46c2-4b16-a8b3-888b33c1cc9c',
  })
  id: string;

  @ApiProperty({
    example: 'bmoon@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'Buster Moon',
  })
  name: string;

  @ApiProperty({
    required: false,
    example:
      'https://c4.wallpaperflare.com/wallpaper/980/289/102/sing-buster-moon-wallpaper-preview.jpg',
  })
  avatar?: string;

  @ApiProperty({
    example: [AuthFeature.CASINO_GET_ITEM],
    enum: AuthFeature,
  })
  features: AuthFeature[];

  @ApiProperty({
    example: '2024-01-22T17:54:36.712Z',
  })
  createdAt: string;

  @ApiProperty({
    example: '2024-02-01T11:04:54.432Z',
  })
  updatedAt: string;
}
