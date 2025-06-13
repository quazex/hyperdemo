import { IsUUID } from '@validators';

export class CategoriesPrimaryReq {
    @IsUUID()
    public category_id: string;
}
