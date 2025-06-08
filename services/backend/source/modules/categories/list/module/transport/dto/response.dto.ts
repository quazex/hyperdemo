import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Type } from 'class-transformer';
import { CategoriesListPagination } from '../../../types/pagination.types';
import { CategoriesSchemaDto } from './schema.dto';

export class CategoriesListResponse implements CategoriesListPagination {
    @Expose()
    @ApiProperty({ minimum: 0 })
    public total: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public pages: number;

    @Expose()
    @Type(() => CategoriesSchemaDto)
    public rows: CategoriesSchemaDto[];

    public static init(data: CategoriesListPagination): CategoriesListResponse {
        return plainToInstance(CategoriesListResponse, data);
    }
}
