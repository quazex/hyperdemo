import { crush, shake } from 'radash';

export class ObjectUtilities {

    public static isEmpty(value: unknown): boolean {
        if (typeof value === 'object' && value !== null) {
            const flatted = crush(value);
            const values = Object.values(flatted);
            const defined = values.filter(Boolean);
            return defined.length === 0;
        }
        return true;
    }

    public static filter<TData extends object>(value: TData): TData {
        return shake(value) as TData;
    }

}
