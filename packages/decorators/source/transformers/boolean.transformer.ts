import { Transform } from 'class-transformer'

export const TransformBoolean = (): PropertyDecorator => Transform((p) => {
  if (typeof p.value === 'boolean') {
    return p.value
  }

  if (p.value === 'true' || p.value === 1) {
    return true
  }
  if (p.value === 'false' || p.value === 0) {
    return false
  }

  return p.value
})
