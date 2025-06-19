import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionsCryptoRepository {
    constructor(private readonly jwtService: JwtService) {}

    public async encode(payload): Promise<string> {
        const value = await this.jwtService.signAsync(payload);
        return value;
    }

    public async decode(value: string): Promise<unknown> {
        const payload = await this.jwtService.verifyAsync(value);
        return payload;
    }
}
