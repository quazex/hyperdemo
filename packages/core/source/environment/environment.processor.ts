import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';
import { Extensions, from } from 'env-var';
import { DotenvParams } from './environment.types';

@Injectable()
export class EnvironmentProcessor {
    public parse<TSchema extends Extensions>(props?: DotenvParams) {
        const env = process.env as never;

        const root = process.cwd();
        const path = props?.path ?? resolve(root, '.env');

        const isExists = existsSync(path);
        if (isExists) {
            const raw = readFileSync(path, 'utf8');
            const dotenv = parse(raw);

            Object.assign(env, dotenv);
        }

        return from<TSchema, Extensions>(env);
    }
}
