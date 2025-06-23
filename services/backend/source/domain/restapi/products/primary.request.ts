import { IsUUID } from '@hyperdemo/validators';

export class ProductsPrimaryReq {
    @IsUUID()
    public product_id: string;
}
