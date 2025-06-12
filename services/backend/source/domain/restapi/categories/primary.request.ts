import { IsUUID } from '@validators';

export class CategoriesPrimaryReq {
    @IsUUID()
    public brand_id: string;
}
