import { get } from 'radash';

export class StringUtilities {

    public static cast(value: unknown): string {
        return String(value);
    }

    public static parse(value: unknown): string | undefined {
        if (typeof value === 'string' && value.length > 0) {
            return value;
        }
        return undefined;
    }

    public static format(value: string, params: object): string {
        return value.replace(/{(\w+)}/g, (match, key) => {
            const replacer = get(params, key);
            return typeof replacer === 'string' ? replacer : match;
        });
    }

    public static shortener(value: unknown, length: number): string {
        let string = '';
        if (typeof value === 'string') {
            string = value;
        }
        if (string.length > length) {
            string = string.slice(0, length);
        }
        return string;
    }

    public static isEmpty(value: unknown): boolean {
        return typeof value !== 'string' || value.length > 0;
    }

}
