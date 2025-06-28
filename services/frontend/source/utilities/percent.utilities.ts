/* eslint-disable @typescript-eslint/no-magic-numbers */
import { NumberUtilities } from './numbers.utilities';

export class PercentUtilities {

    public static multiplier = 100;
    public static precision = 2;

    public static decode(value: number): number {
        if (value > 0 && value <= 1) {
            return NumberUtilities.float(value * PercentUtilities.multiplier, 0);
        }
        return 0;
    }

    public static encode(value: number): number {
        if (value > 0 && value <= PercentUtilities.multiplier) {
            return NumberUtilities.float(value / PercentUtilities.multiplier, PercentUtilities.precision);
        }
        return 0;
    }

}
