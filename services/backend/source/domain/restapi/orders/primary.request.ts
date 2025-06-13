import { IsUUID } from '@validators';

export class OrdersPrimaryReq {
    @IsUUID()
    public order_id: string;
}
