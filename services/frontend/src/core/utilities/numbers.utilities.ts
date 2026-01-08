export class NumberUtilities {
  public static parse(value: unknown): number | undefined {
    if (typeof value === 'number' && Number.isNaN(value) === false) {
      return value
    }
    if (typeof value === 'string') {
      const integer = Number.parseInt(value)
      return NumberUtilities.parse(integer)
    }
    return undefined
  }

  public static default(value: unknown, defaultValue = 0): number {
    const integer = NumberUtilities.parse(value)
    if (typeof integer === 'number') {
      return integer
    }
    return defaultValue
  }

  public static sanitize(value: string): string {
    return value.replace(/^0+/g, '').replace(/\D+/g, '')
  }

  public static float(value: number, decimal: number): number {
    const p = 10 ** decimal
    const n = (value * p) * (1 + Number.EPSILON)
    return Math.round(n) / p
  }
}
