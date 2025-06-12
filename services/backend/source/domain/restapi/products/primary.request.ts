import { IsUUID } from '@validators';

export class ProductsPrimaryReq {
    @IsUUID()
    public product_id: string;
}
