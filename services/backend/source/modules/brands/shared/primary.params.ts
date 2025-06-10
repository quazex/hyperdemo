import { IsUUID } from '../../../shared/requests/decorators/is-uuid.decorator';

export class BrandsPrimaryParams {
    @IsUUID()
    public brand_id: string;
}
