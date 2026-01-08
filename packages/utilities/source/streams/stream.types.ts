export type TCallbackError = (error?: Error | null) => void

export type TCallbackEmpty = () => void

export interface TIteratorOptions {
  destroyOnReturn?: boolean
}
