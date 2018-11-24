export class Dictionary<T> {

  private readonly data: Array<{ key: string, item: T }> = [];

  add(key: string, item: T): void {
    this.data.push({key: key, item: item});
  }

  remove(key: string): void {
    let index = this.data.findIndex(item => item.key === key);
    if (index !== -1) this.data.splice(index, 1);
  }

  get(key: string): T {
    let data = this.data.find(item => item.key === key);
    if (data) return data.item;

    return null;
  }

  keys(): Array<string> {
    return this.data.map(item => item.key);
  }
}
