import { faker } from '@faker-js/faker'
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import { HttpStatus } from '@nestjs/common'
import { v7 as UUIDv7 } from 'uuid'
import { TestingApplication } from './application.mock'
import { TestsValidatorsController } from './controller.mock'
import { IntEnum } from './enum.mock'
import { ImageMock } from './image.mock'

describe('Decorators', () => {
  const testingApp = new TestingApplication()

  afterAll(testingApp.close.bind(testingApp))

  beforeAll(() => testingApp.init({
    controllers: [
      TestsValidatorsController,
    ],
  }))

  test('Bad request with empty body', async () => {
    const response = await testingApp.inject({
      method: 'POST',
      url: '/required/composite',
    })
    const body = response.json()

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST)
    expect(body.message).toBeDefined()
  })

  describe('Success', () => {
    test('Success with correct body', async () => {
      const response = await testingApp.inject({
        method: 'POST',
        url: '/required/composite',
        body: {
          id: UUIDv7(),
          object_id: faker.database.mongodbObjectId(),
          text: faker.lorem.sentence(),
          quantity: faker.number.int({ min: -10, max: 10 }),
          isFlag: faker.datatype.boolean(),
          dict: IntEnum.SOME,
          image: ImageMock,
          timestamp: '2025-04-01T12:34:56Z',
        },
      })
      const body = response.json()

      expect(response.statusCode).toBe(HttpStatus.OK)
      expect(body).toBeTruthy()
    })
  })

  describe('String', () => {
    test('Success', async () => {
      const response = await testingApp.inject({
        method: 'POST',
        url: '/combinations/string',
        body: {
          defaultValue: faker.lorem.word(),
          requiredValue: faker.lorem.word(),
          optionalValue: undefined,
        },
      })
      expect(response.statusCode).toBe(HttpStatus.OK)
    })

    test('Error with empty body', async () => {
      const response = await testingApp.inject({
        method: 'POST',
        url: '/combinations/string',
      })
      const body = response.json()

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST)
      expect(body.message.length).toBe(4)
    })

    test('Error with empty values', async () => {
      const response = await testingApp.inject({
        method: 'POST',
        url: '/combinations/string',
        body: {
          defaultValue: '',
          requiredValue: '',
          optionalValue: '',
        },
      })
      const body = response.json()

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST)
      expect(body.message.length).toBe(3)
    })

    test('Error with minimum length', async () => {
      const response = await testingApp.inject({
        method: 'POST',
        url: '/combinations/string',
        body: {
          defaultValue: faker.lorem.word(),
          requiredValue: faker.lorem.word(),
          optionalValue: undefined,
          lengthValue: faker.lorem.word(2),
        },
      })
      const body = response.json()

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST)
      expect(body.message.length).toBe(1)
    })

    test('Error with maximum length', async () => {
      const response = await testingApp.inject({
        method: 'POST',
        url: '/combinations/string',
        body: {
          defaultValue: faker.lorem.word(),
          requiredValue: faker.lorem.word(),
          optionalValue: undefined,
          lengthValue: faker.lorem.word(11),
        },
      })
      const body = response.json()

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST)
      expect(body.message.length).toBe(1)
    })
  })

  describe('Number', () => {
    test('Error with string start with digit', async () => {
      const response = await testingApp.inject({
        method: 'GET',
        url: '/required/number',
        query: {
          id: '1st',
        },
      })
      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST)
    })
  })

  describe('Price', () => {
    test('Success', async () => {
      const response = await testingApp.inject({
        method: 'POST',
        url: '/required/price',
        body: {
          price: '9.34',
        },
      })
      expect(response.statusCode).toBe(HttpStatus.OK)
    })

    test('Error with empty body', async () => {
      const response = await testingApp.inject({
        method: 'POST',
        url: '/required/price',
      })
      const body = response.json()

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST)
      expect(body.message.length).toBe(3)
    })

    test('Error with minimum', async () => {
      const response = await testingApp.inject({
        method: 'POST',
        url: '/required/price',
        body: {
          price: '0',
        },
      })
      const body = response.json()

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST)
      expect(body.message.length).toBe(1)
    })

    test('Error with maximum', async () => {
      const response = await testingApp.inject({
        method: 'POST',
        url: '/required/price',
        body: {
          price: '100',
        },
      })
      const body = response.json()

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST)
      expect(body.message.length).toBe(1)
    })
  })

  describe('Optional fields', () => {
    describe('Boolean', () => {
      test('Success with empty field', async () => {
        const response = await testingApp.inject({
          method: 'POST',
          url: '/optional/boolean',
        })
        expect(response.statusCode).toBe(HttpStatus.OK)
      })

      test('Bad request with incorrect payload', async () => {
        const response = await testingApp.inject({
          method: 'POST',
          url: '/optional/boolean',
          body: {
            isFlag: faker.lorem.word(),
          },
        })
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST)
      })
    })

    describe('Date', () => {
      test('Success with empty field', async () => {
        const response = await testingApp.inject({
          method: 'POST',
          url: '/optional/date',
        })
        expect(response.statusCode).toBe(HttpStatus.OK)
      })

      test('Bad request with incorrect payload', async () => {
        const response = await testingApp.inject({
          method: 'POST',
          url: '/optional/date',
          body: {
            timestamp: faker.lorem.word(),
          },
        })
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST)
      })
    })

    describe('Image', () => {
      test('Success with empty field', async () => {
        const response = await testingApp.inject({
          method: 'POST',
          url: '/optional/image',
        })
        expect(response.statusCode).toBe(HttpStatus.OK)
      })

      test('Bad request with incorrect payload', async () => {
        const response = await testingApp.inject({
          method: 'POST',
          url: '/optional/image',
          body: {
            image: faker.image.avatar(),
          },
        })
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST)
      })
    })

    describe('Number', () => {
      test('Success with empty field', async () => {
        const response = await testingApp.inject({
          method: 'POST',
          url: '/optional/number',
        })
        expect(response.statusCode).toBe(HttpStatus.OK)
      })

      test('Bad request with incorrect payload', async () => {
        const response = await testingApp.inject({
          method: 'POST',
          url: '/optional/number',
          body: {
            quantity: faker.lorem.word(),
          },
        })
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST)
      })
    })
  })
})
