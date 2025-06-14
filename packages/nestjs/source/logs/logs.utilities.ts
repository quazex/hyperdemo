import { serialize } from 'v8';
import { crush, isObject } from 'radash';

export class LogsUtilities {
    public static getSizeBytes(data: unknown): number {
        return serialize(data).byteLength;
    }

    public static getBody<TBody = unknown>(...args: unknown[]): TBody | undefined {
        for (const data of args) {
            const isObj = isObject(data);
            if (isObj) {
                const clone = structuredClone(data);
                const keys = Object.keys(clone);

                if (keys.length > 0) {
                    return data as TBody;
                }
            }
        }
        return undefined;
    }

    public static stringify(message: unknown): string {
        const isObj = isObject(message);

        if (isObj) {
            const copy = structuredClone(message);
            const flat = crush(copy);
            const entries = Object.entries(flat);
            const pairs = entries.map((pair) => pair.join('='));
            return pairs.join('; ');
        }

        return String(message);
    }
}
