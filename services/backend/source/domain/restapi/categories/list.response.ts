import { TPaginationRes } from '@domain/restapi';
import { TCategoriesDataSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Type } from 'class-transformer';
import { CategoriesDataRes } from './data.response';

export type TCategoriesPagination = TPaginationRes<TCategoriesDataSchema>;

export class CategoriesListRes implements TCategoriesPagination {
    @ApiProperty({ minimum: 0 })
    public total: number;

    @ApiProperty({ minimum: 0 })
    public pages: number;

    @Type(() => CategoriesDataRes)
    public rows: CategoriesDataRes[];

    public static init(data: TCategoriesPagination): CategoriesListRes {
        return plainToInstance(CategoriesListRes, data);
    }
}
