import { Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class TestingGuard implements CanActivate {
    public canActivate(): boolean {
        return true;
    }
}
