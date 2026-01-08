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
import { HttpExceptionFilter } from '@shared/errors'
import { useContainer } from 'class-validator'
import { Environment } from 'environment'
import { AppModule } from './app.module'
import { AppConfig } from './config/app.config'
import { SwaggerConfig } from './config/swagger.config'

const bootstrap = async (): Promise<void> => {
  const fastifyAdapter = new FastifyAdapter()

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
    json: appConfig.isProd,
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

  if (Environment.App.docsEnabled) {
    const api = swagger.getAPI()
    const document = SwaggerModule.createDocument(app, api)
    SwaggerModule.setup('docs', app, document)
  }

  await app.listen(Environment.App.port, '0.0.0.0')
}

bootstrap()
