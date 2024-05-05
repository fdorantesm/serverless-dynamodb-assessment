export abstract class Entity<T extends { id: string }> {
  protected _props: T;

  protected constructor(props: T) {
    this._props = props;
  }

  public getId(): string {
    return this._props.id;
  }

  public _toJson() {
    return {
      ...this._props,
    };
  }

  public _toObject() {
    return {
      ...this._props,
    };
  }
}
