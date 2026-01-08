import { HttpExceptionFilter } from '@hyperdemo/exceptions'
import {
  ClassSerializerInterceptor,
  ConsoleLogger,
  NestApplicationOptions,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import { AppModule } from './app.module'
import { AppConfig } from './config/app.config'
import { DocsConfig } from './config/docs.config'
import { FastifyConfig } from './config/fastify.config'
import { SwaggerConfig } from './config/swagger.config'

const bootstrap = async (): Promise<void> => {
  const fastifyAdapter = new FastifyAdapter(FastifyConfig)

  const options: NestApplicationOptions = {
    bufferLogs: true,
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    options,
  )

  const appModule = app.select(AppModule)
  const appReflector = app.get(Reflector)
  const appConfig = app.get(AppConfig)
  const docsConfig = app.get(DocsConfig)
  const swagger = app.get(SwaggerConfig)

  const globalPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })

  const globalFilter = new HttpExceptionFilter()

  const globalSerializer = new ClassSerializerInterceptor(appReflector, {
    strategy: 'exposeAll',
  })

  const logger = new ConsoleLogger({
    compact: true,
    json: appConfig.production,
    depth: 2,
  })

  app.useLogger(logger)
  app.useGlobalInterceptors(globalSerializer)
  app.useGlobalFilters(globalFilter)
  app.useGlobalPipes(globalPipe)

  app.enableCors()
  app.enableShutdownHooks()

  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
  })

  useContainer(appModule, { fallbackOnErrors: true })

  if (docsConfig.is_enabled) {
    const api = swagger.getAPI()
    const document = SwaggerModule.createDocument(app, api)
    SwaggerModule.setup('docs', app, document)
  }

  await app.listen(appConfig.port, '0.0.0.0')
}

bootstrap()
