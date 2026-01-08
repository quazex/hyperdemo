import { DateTime } from 'luxon'
import { Sharp } from 'sharp'
import {
  ImageMime,
  TransformBoolean,
  TransformDateTime,
  TransformImage,
  TransformNumber,
  ValidateBoolean,
  ValidateDateTime,
  ValidateEnum,
  ValidateImage,
  ValidateNumber,
  ValidatePrice,
  ValidateObjectId,
  ValidateString,
  ValidateUUID,
} from '@/index'
import { IntEnum } from './enum.mock'

export class TestsRequiredComposite {
  @ValidateUUID()
  public id: string

  @ValidateObjectId()
  public object_id: string

  @ValidateString()
  public text: string

  @TransformNumber()
  @ValidateNumber()
  public quantity: number

  @TransformBoolean()
  @ValidateBoolean()
  public isFlag: boolean

  @TransformNumber()
  @ValidateEnum(IntEnum)
  public dict: IntEnum

  @TransformImage()
  @ValidateImage([ImageMime.PNG])
  public image: Sharp

  @TransformDateTime()
  @ValidateDateTime()
  public timestamp: DateTime
}

export class TestsRequiredNumber {
  @TransformNumber()
  @ValidateNumber()
  public id: number
}

export class TestsOptionalImage {
  @TransformImage()
  @ValidateImage([ImageMime.PNG], { required: false })
  public image?: Sharp
}

export class TestsOptionalDate {
  @TransformDateTime()
  @ValidateDateTime({ required: false })
  public timestamp?: DateTime
}

export class TestsOptionalNumber {
  @TransformNumber()
  @ValidateNumber({ required: false })
  public quantity?: number
}

export class TestsOptionalBoolean {
  @TransformBoolean()
  @ValidateBoolean({ required: false })
  public isFlag: boolean
}

export class TestsPriceDTO {
  @ValidatePrice({ minimum: 1.01, maximum: 10 })
  public price: string
}

export class TestsStringDTO {
  @ValidateString()
  public defaultValue: string

  @ValidateString({ required: true })
  public requiredValue: string

  @ValidateString({ required: false })
  public optionalValue?: string

  @ValidateString({ required: false, minLength: 3, maxLength: 10 })
  public lengthValue?: string
}
