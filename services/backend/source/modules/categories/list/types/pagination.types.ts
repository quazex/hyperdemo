import { TCategoriesDataSchema } from '../../../../models/schemas';
import { TPaginationRes } from '../../../../shared/pagination';

export type TCategoriesListPagination = TPaginationRes<TCategoriesDataSchema>;
