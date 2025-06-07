import { Injectable } from '@nestjs/common';

@Injectable()
export class ViewConfig {
    public readonly itemsPerPage = 40;
}
