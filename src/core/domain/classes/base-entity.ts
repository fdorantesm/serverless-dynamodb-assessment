import { Entity } from '@/core/domain/classes/entity';
import type { BaseProps } from '@/core/domain/interfaces/base-props.interface';

export abstract class BaseEntity<T extends BaseProps> extends Entity<T> {
  protected _props: T;
  protected _id: string;

  protected constructor(props: T) {
    super(props);
    this._props = props;
    this._id = props.id;
  }
}

export type PayloadBaseProps = Pick<BaseProps, 'id'>;
