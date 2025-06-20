import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export type TNestedBuilder<TEntity extends ObjectLiteral> = (queryBuilder: SelectQueryBuilder<TEntity>) => SelectQueryBuilder<TEntity>;
