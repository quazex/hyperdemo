import { IsUUID } from '@hyperdemo/validators';

export class CategoriesPrimaryReq {
    @IsUUID()
    public category_id: string;
}
