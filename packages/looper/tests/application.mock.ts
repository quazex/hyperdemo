import { ModuleMetadata, ValidationPipe } from '@nestjs/common'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test } from '@nestjs/testing'
import { InjectOptions, LightMyRequestResponse } from 'fastify'

export class TestingApplication {
  #instance: NestFastifyApplication

  public async init(metadata: ModuleMetadata): Promise<void> {
    const tBuilder = Test.createTestingModule(metadata)
    const tModule = await tBuilder.compile()

    const fastifyAdapter = new FastifyAdapter()
    this.#instance = tModule.createNestApplication(fastifyAdapter)

    const globalPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })

    this.#instance.useGlobalPipes(globalPipe)
    this.#instance.enableShutdownHooks()

    await this.#instance.init()
    await this.#instance.getHttpAdapter().getInstance().ready()
  }

  public get instance(): NestFastifyApplication {
    return this.#instance
  }

  public inject(opts: InjectOptions): Promise<LightMyRequestResponse> {
    return this.#instance.inject(opts)
  }

  public async close(): Promise<void> {
    await this.#instance.close()
  }
}
