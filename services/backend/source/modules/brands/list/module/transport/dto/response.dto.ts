import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Type } from 'class-transformer';
import { TBrandsListPagination } from '../../../types/pagination.types';
import { BrandsSchemaDto } from './schema.dto';

export class BrandsListResponse implements TBrandsListPagination {
    @Expose()
    @ApiProperty({ minimum: 0 })
    public total: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public pages: number;

    @Expose()
    @Type(() => BrandsSchemaDto)
    public rows: BrandsSchemaDto[];

    public static init(data: TBrandsListPagination): BrandsListResponse {
        return plainToInstance(BrandsListResponse, data);
    }
}
