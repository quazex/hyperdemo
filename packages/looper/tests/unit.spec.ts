import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import { LooperModule } from '../source/module/looper.module'
import { TestingApplication } from './application.mock'
import { TestingWorkerMock } from './worker.mock'

describe('Looper', () => {
  const testingApp = new TestingApplication()

  afterAll(testingApp.close.bind(testingApp))

  beforeAll(() => testingApp.init({
    imports: [
      LooperModule.forRoot({
        autoStart: true,
      }),
    ],
    providers: [
      TestingWorkerMock,
    ],
  }))

  test('Проверка работы модуля с большим интервалом', async () => {
    const worker = testingApp.instance.get(TestingWorkerMock)
    expect(worker).toBeInstanceOf(TestingWorkerMock)
  })
})
