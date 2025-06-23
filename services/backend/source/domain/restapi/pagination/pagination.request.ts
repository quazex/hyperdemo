import { IsNumber } from '@hyperdemo/validators';

export class PaginationReq {
    @IsNumber({ minimum: 1, example: 1 })
    public page: number;
}
