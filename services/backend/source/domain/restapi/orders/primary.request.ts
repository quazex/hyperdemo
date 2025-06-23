import { IsUUID } from '@hyperdemo/validators';

export class OrdersPrimaryReq {
    @IsUUID()
    public order_id: string;
}
