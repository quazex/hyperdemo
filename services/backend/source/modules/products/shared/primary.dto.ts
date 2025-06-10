import { IsUUID } from '../../../shared/requests/decorators/is-uuid.decorator';

export class ProductsPrimaryDto {
    @IsUUID()
    public product_id: string;
}
