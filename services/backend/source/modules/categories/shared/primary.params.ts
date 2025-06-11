import { IsUUID } from '../../../shared/validators/is-uuid.decorator';

export class CategoriesPrimaryParams {
    @IsUUID()
    public category_id: string;
}
