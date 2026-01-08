import { Transform } from 'class-transformer'
import xss from 'xss'

export const TransformXss = (): PropertyDecorator => Transform((p) => xss(p.value))
