import { faker } from '@faker-js/faker'
import { describe, expect, test } from '@jest/globals'
import { Groups } from '../../source/groups/index'
import { GroupsFactory } from './groups.mock'
import { TGroupsRecord } from './groups.types'

describe('Groups', () => {
  describe('set', () => {
    test('should group items in 10 groups', () => {
      const buffer = new Groups<string, TGroupsRecord>()

      const mocks = GroupsFactory.createMany()
      for (const record of mocks) {
        buffer.set(record.name, record)
      }

      const random = faker.helpers.arrayElement(mocks)
      const count = buffer.count(random.name)
      const filtered = mocks.filter((rec) => rec.name === random.name)

      expect(count).toBe(filtered.length)
      expect(buffer.size).toBeGreaterThan(1)
      expect(buffer.size).toBeLessThan(mocks.length)
    })
  })

  describe('delete', () => {
    test('delete key from buffer', () => {
      const buffer = new Groups<string, TGroupsRecord>()

      const mocks = GroupsFactory.createMany()
      for (const record of mocks) {
        buffer.set(record.name, record)
      }

      const sizeBefore = buffer.size
      expect(sizeBefore).toBeGreaterThan(1)

      const random = faker.helpers.arrayElement(mocks)
      buffer.delete(random.name)

      const sizeAfter = buffer.size
      expect(sizeAfter).toBeGreaterThan(1)
      expect(sizeAfter).toBeLessThan(sizeBefore)
    })
    test('delete on missing key', () => {
      const buffer = new Groups<string, TGroupsRecord>()

      const mocks = GroupsFactory.createMany()
      for (const record of mocks) {
        buffer.set(record.name, record)
      }

      const sizeBefore = buffer.size
      expect(sizeBefore).toBeGreaterThan(1)

      const random = faker.lorem.word()
      buffer.delete(random)

      const sizeAfter = buffer.size
      expect(sizeAfter).toBeGreaterThan(1)
      expect(sizeAfter).toBe(sizeBefore)
    })
  })

  describe('clear', () => {
    test('clear all groups', () => {
      const buffer = new Groups<string, TGroupsRecord>()

      const mocks = GroupsFactory.createMany()
      for (const record of mocks) {
        buffer.set(record.name, record)
      }

      buffer.clear()
      expect(buffer.size).toBe(0)
    })
  })

  describe('has', () => {
    test('key exists', () => {
      const buffer = new Groups<string, TGroupsRecord>()

      const mocks = GroupsFactory.createMany()
      for (const record of mocks) {
        buffer.set(record.name, record)
      }

      const random = faker.helpers.arrayElement(mocks)
      const has = buffer.has(random.name)

      expect(has).toBe(true)
    })
    test('missing key', () => {
      const buffer = new Groups<string, TGroupsRecord>()

      const mocks = GroupsFactory.createMany()
      for (const record of mocks) {
        buffer.set(record.name, record)
      }

      const random = faker.lorem.word()
      const has = buffer.has(random)

      expect(has).toBe(false)
    })
  })

  describe('toObject', () => {
    test('return copy of internal object', () => {
      const buffer = new Groups<string, TGroupsRecord>()

      const mocks = GroupsFactory.createMany()
      for (const record of mocks) {
        buffer.set(record.name, record)
      }

      const obj = buffer.toObject()
      expect(obj).toBeDefined()
    })
  })
})
