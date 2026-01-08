import { Injectable } from '@nestjs/common'
import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger'

@Injectable()
export class SwaggerConfig {
  public getAPI(): Omit<OpenAPIObject, 'paths'> {
    return new DocumentBuilder()
      .setTitle('HyperDemo')
      .setDescription('Demo shop analytics')
      .addBearerAuth()
      .build()
  }
}
