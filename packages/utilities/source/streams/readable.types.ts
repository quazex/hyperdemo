import { Readable } from 'stream'
import { TIteratorOptions } from './stream.types'

export interface TReadable<TData> extends Readable {
  [Symbol.asyncIterator](): NodeJS.AsyncIterator<TData>
  push(chunk: TData, encoding?: BufferEncoding): boolean
  iterator(options?: TIteratorOptions): NodeJS.AsyncIterator<TData>
  on(event: 'close', listener: () => void): this
  on(event: 'data', listener: (chunk: TData) => void): this
  on(event: 'end', listener: () => void): this
  on(event: 'error', listener: (err: Error) => void): this
  on(event: 'pause', listener: () => void): this
  on(event: 'readable', listener: () => void): this
  on(event: 'resume', listener: () => void): this
}
