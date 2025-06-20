import { TPaginationRes } from '@domain/restapi';
import { TOrdersDataSchema } from './data.types';

export type TOrdersListSchema = TPaginationRes<TOrdersDataSchema>;
