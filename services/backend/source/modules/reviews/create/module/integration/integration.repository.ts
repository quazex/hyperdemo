import { ReviewsDataEntity } from '@domain/database';
import { ReviewsDataModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsCreateRepository {
    constructor(
        @InjectRepository(ReviewsDataEntity)
        private readonly repository: Repository<ReviewsDataEntity>,
    ) {}

    public async create(model: ReviewsDataModel): Promise<void> {
        const entity = model.toEntity();
        await this.repository.save(entity);
    }
}
