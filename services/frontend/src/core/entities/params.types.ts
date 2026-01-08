import { Params } from 'next/dist/server/request/params'

export interface TParams extends Params {
  locale: string
}

export interface TProps {
  params: Promise<TParams>
  searchParams: Promise<unknown>
};
