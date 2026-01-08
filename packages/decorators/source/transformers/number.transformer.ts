import { Transform } from 'class-transformer'

export const TransformNumber = (): PropertyDecorator => Transform((p) => {
  if (typeof p.value === 'number') {
    return p.value
  }
  if (typeof p.value === 'string') {
    return Number(p.value)
  }

  return p.value
})
