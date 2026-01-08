import { Writable } from 'stream'
import { TCallbackEmpty, TCallbackError } from './stream.types'

export interface TWritableChunks<TData> {
  chunk: TData
  encoding: BufferEncoding
}

export interface TWritable<TData> extends Writable {
  _writev?(chunks: Array<TWritableChunks<TData>>, callback: TCallbackError): void
  _write(chunk: TData, encoding: BufferEncoding, callback: TCallbackError): void
  write(chunk: TData, encoding?: BufferEncoding, callback?: TCallbackError): boolean
  write(chunk: TData, callback?: TCallbackError): boolean
  end(chunk: TData, encoding?: BufferEncoding, callback?: TCallbackEmpty): this
  end(chunk: TData, callback?: TCallbackEmpty): this
  end(callback?: TCallbackEmpty): this
}
