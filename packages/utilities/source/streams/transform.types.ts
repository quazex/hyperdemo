import { Transform, TransformCallback } from 'stream'
import { TCallbackError, TIteratorOptions } from './stream.types'

export interface TTransform<TData> extends Transform {
  [Symbol.asyncIterator](): NodeJS.AsyncIterator<TData>
  _transform(chunk: TData, encoding: BufferEncoding, callback: TransformCallback): void
  _write(chunk: TData, encoding: BufferEncoding, callback: TCallbackError): void
  iterator(options?: TIteratorOptions): NodeJS.AsyncIterator<TData>
  push(chunk: TData, encoding?: BufferEncoding): boolean
}
