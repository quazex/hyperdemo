import { Exception } from '@hyperdemo/nestjs/modules/exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TOrdersInfoFilters } from '../../types/filters.types';
import { OrdersInfoRepository } from '../integration/integration.repository';

@Injectable()
export class OrdersInfoService {
    constructor(private readonly repository: OrdersInfoRepository) {}

    public async getInfo(filters: TOrdersInfoFilters) {
        const doc = await this.repository.getOne(filters);
        if (!doc) {
            throw new Exception({
                message: 'Cannot find order',
                status: HttpStatus.NOT_FOUND,
                context: filters,
            });
        }
        return doc;
    }
}
