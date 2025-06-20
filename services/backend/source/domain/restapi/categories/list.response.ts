import { CategoriesListModel } from '@domain/models';
import { TCategoriesListSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Type } from 'class-transformer';
import { CategoriesDataRes } from './data.response';

export class CategoriesListRes implements TCategoriesListSchema {
    @ApiProperty({ minimum: 0 })
    public total: number;

    @ApiProperty({ minimum: 0 })
    public pages: number;

    @Type(() => CategoriesDataRes)
    public rows: CategoriesDataRes[];

    public static init(model: CategoriesListModel): CategoriesListRes {
        const schema = model.toSchema();
        return plainToInstance(CategoriesListRes, schema);
    }
}
