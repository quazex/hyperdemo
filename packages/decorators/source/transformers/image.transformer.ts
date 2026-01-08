import { Transform } from 'class-transformer'
import Sharp from 'sharp'

export const TransformImage = (): PropertyDecorator => Transform((p) => {
  if (typeof p.value === 'string') {
    const base64 = p.value.split(',').at(-1)
    if (base64) {
      const buf = Buffer.from(base64, 'base64')
      return Sharp(buf)
    }
  }

  return p.value
})
