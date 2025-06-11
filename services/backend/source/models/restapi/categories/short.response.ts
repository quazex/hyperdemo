import { TCategoriesShortSchema } from '@models/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoriesShortRes implements TCategoriesShortSchema {
    @Expose()
    @ApiProperty({ description: 'UUID v4' })
    public id: string;

    @Expose()
    public name: string;
}
