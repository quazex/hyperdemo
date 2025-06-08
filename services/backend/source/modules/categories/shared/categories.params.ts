import { IsUUID } from '../../../shared/requests/decorators/is-uuid.decorator';

export class CategoriesPrimaryParams {
    @IsUUID()
    public category_id: string;
}
