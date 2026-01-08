export class Groups<TKey, TData> {
  private buffer = new Map<TKey, TData[]>()

  constructor(entries?: Array<[TKey, TData]>) {
    if (Array.isArray(entries) && entries.length) {
      for (const item of entries) {
        if (Array.isArray(item)) {
          this.set(item[0], item[1])
        }
      }
    }
  }

  public clone(): Groups<TKey, TData> {
    const groups = new Groups<TKey, TData>()
    for (const [key, val] of this.buffer.entries()) {
      groups.buffer.set(key, structuredClone(val))
    }
    return groups
  }

  public get size(): number {
    return this.buffer.size
  }

  public count(key: TKey): number {
    return this.buffer.get(key)?.length ?? 0
  }

  public set(key: TKey, payload: TData): void {
    const isArrayExists = this.buffer.has(key)

    if (isArrayExists === false) {
      this.buffer.set(key, [])
    }

    this.buffer.get(key)?.push(payload)
  }

  public get(key: TKey): TData[] | undefined {
    return this.buffer.get(key)
  }

  public delete(field: TKey): boolean {
    return this.buffer.delete(field)
  }

  public clear(): void {
    this.buffer.clear()
  }

  public keys(): TKey[] {
    const keys = this.buffer.keys()
    return Array.from(keys)
  }

  public values(): TData[][] {
    const values = this.buffer.values()
    return Array.from(values)
  }

  public has(key: TKey): boolean {
    return this.buffer.has(key)
  }

  public entries(): Array<[TKey, TData[]]> {
    const entries = this.buffer.entries()
    return Array.from(entries)
  }

  public toObject(): Record<string, TData[]> {
    const entries = this.buffer.entries()
    return Object.fromEntries(entries)
  }

  public * [Symbol.iterator](): IterableIterator<[TKey, TData[]]> {
    for (const [key, val] of this.buffer) {
      yield [key, val]
    }
  }
}
