import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { AppConfig } from '@config';
import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult, HealthIndicatorService } from '@nestjs/terminus';
import { PackageJson } from 'type-fest';

@Injectable()
export class UptimeHealthIndicator {
    private readonly package: Required<PackageJson>;

    constructor(
        private readonly appConfig: AppConfig,
        private readonly service: HealthIndicatorService,
    ) {
        const root = process.cwd();
        const path = resolve(root, 'package.json');
        const content = readFileSync(path, 'utf8');
        this.package = JSON.parse(content);
    }

    public async isHealthy(key: string): Promise<HealthIndicatorResult> {
        const indicator = this.service.check(key);

        const uptime = process.uptime();

        const probe = {
            version: this.package.version,
            uptime: Math.floor(uptime),
            timestamp: this.appConfig.now.toISO(),
        };

        const hash = await new Promise<string | undefined>((resolve) => {
            exec('git rev-parse HEAD', (_, stdout) => {
                const lines = stdout.split('\n');
                const tag = lines.at(0)?.trim();
                resolve(tag || undefined);
            });
        });
        if (typeof hash === 'string') {
            probe.version = hash;
        }

        const appVersion = this.appConfig.version;
        if (typeof appVersion === 'string') {
            probe.version = appVersion;
        }

        if (probe.uptime === 0) {
            return indicator.down(probe);
        }

        return indicator.up(probe);
    }
}
