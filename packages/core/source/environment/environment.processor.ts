import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';
import { Extensions, from } from 'env-var';
import { DotenvParams } from './environment.types';

@Injectable()
export class EnvironmentProcessor {
    public parse<TSchema extends Extensions>(props?: DotenvParams) {
        const files: string[] = [];

        const env = structuredClone(process.env as never);
        const arg = process.argv.find((a) => a.startsWith('-e='));
        const val = arg?.split('=').at(1);

        if (typeof val === 'string') {
            files.push(val);
        }
        else if (Array.isArray(props?.files)) {
            files.push(...props.files);
        }


        for (const filename of files) {
            const root = process.cwd();
            const path = resolve(root, filename);

            const isExists = existsSync(path);
            if (isExists) {
                const raw = readFileSync(path, 'utf8');
                const dotenv = parse(raw);

                Object.assign(env, dotenv);
            }
        }

        return from<TSchema, Extensions>(env);
    }
}
