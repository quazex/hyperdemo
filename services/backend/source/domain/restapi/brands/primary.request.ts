import { IsUUID } from '@validators';

export class BrandsPrimaryReq {
    @IsUUID()
    public brand_id: string;
}
